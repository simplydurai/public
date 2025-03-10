

%% Step 0: Initiate script and working environment

ft_ConfigureFieldTripSettings();
dipfitpath = '/Users/ad727/Documents/EEGSoftware/eeglab2022.0/plugins/dipfit/';

% Choose step to begin processing at
steps = {'Load EEG data','Apply filters','Epoch data','Reject bad channels','Interpolate',...
    'Average reference','ICA','Reject components'};

[idx,~] = listdlg('PromptString','Select step to start at',...
    'ListString',steps,'SelectionMode','single');

% Load directories
previousOpts = questdlg('Would you like to use the directories from your previous run?');
if strcmp(previousOpts,'Yes')
    load(['opts_',mfilename,'.mat'],'eeglabDir','workingDir',...
        'dataDir','locFile','locFilePath');
    addpath(workingDir)
    addpath(workingDir,filesep,'export_figure-master')
    addpath(dataDir)
    addpath(eeglabDir)
    eeglab
    close all
else
    disp('Please specify working directory (where your pipeline scripts are stored).')
    workingDir = uigetdir(path,'Select working directory.');
    addpath(workingDir)
    addpath(workingDir,filesep,'export_figure-master')
    
    disp('Please specify eeglab directory (eeglab folder).')
    eeglabDir = uigetdir(path,'Select eeglab directory.');
    addpath(eeglabDir)
    eeglab
    close all
    
    disp('Please specify data directory (where folders are created).')
    dataDir = uigetdir(path,'Select file directory.');
    
    disp('Please specify channel location file.')
    % eeglab_chan32.locs
    [locFile,locFilePath] = uigetfile('*.locs','Select channel location file.');
    save(strcat(workingDir,filesep,['opts_',mfilename,'.mat']),'eeglabDir',...
        'workingDir', 'dataDir','locFile','locFilePath');
end

if idx == 1
    name = input('Please specify name to attach to files: ','s');
else
    name = input('Please specify name associated files: ','s');
end
fileDir = strcat(dataDir,filesep,mfilename,filesep,name);

if ~exist(fileDir,'dir')
    mkdir(fileDir)
end

skip = 0;

pop_editoptions('option_single', 0);

close all

%% Step 1: Load EEG data %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
if idx == 1
disp('Please specify .set file from which you want to load data.')
[dataFile,dataFilePath] = uigetfile('*.set','Select EEG data file.');
EEG = pop_loadset('filename',strcat(dataFilePath,filesep,dataFile));

EEG.pipeline = mfilename;

% Resample to 512 Hz if sample rate too high
if EEG.srate >= 1024
    EEG = pop_resample(EEG, 512);
    EEG = eeg_checkset(EEG);
    EEG.comments = pop_comments(EEG.comments,'','Resampled to 512 Hz',1);
end

% Load channel locations
EEG=pop_chanedit(EEG, 'load',strcat(locFilePath,locFile));

EEG.comments = pop_comments(EEG.comments,'','Channel locations loaded',1);

[ALLEEG EEG CURRENTSET] = pop_newset(ALLEEG, EEG, 1,'setname',name,...
    'savenew',strcat(fileDir,filesep,name),'overwrite','on','gui','off'); 
end

%% Step 2: Apply filters %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
if idx <= 2
if idx == 2
    EEG = pop_loadset('filename',strcat(fileDir,filesep,name,'.set'));
end

% detrend continous data
% EEG.data = detrend(EEG.data')';
% EEG = eeg_checkset(EEG);


% %high pass filter
EEG = pop_eegfiltnew(EEG, 'locutoff',0.1,'plotfreqz',1);
EEG = eeg_checkset(EEG);


% % Notch filter
EEG = pop_cleanline(EEG, 'LineFrequencies',[50 60 100 120] );
EEG = eeg_checkset(EEG);


% Lowpassfilter - If frequency analysis it will 60Hz , for time analysis it
% will be 30 Hz

EEG = pop_eegfiltnew(EEG, 'hicutoff',60,'plotfreqz',1);


% signal      = struct('data', EEG.data, 'srate', EEG.srate);
% lineNoiseIn = struct('lineNoiseMethod', 'clean', ...
%                      'lineNoiseChannels', 1:EEG.nbchan,...
%                      'Fs', EEG.srate, ...
%                      'lineFrequencies', [50 60],...
%                      'p', 0.01, ...
%                      'fScanBandWidth', 2, ...
%                      'taperBandWidth', 2, ...
%                      'taperWindowSize', 4, ...
%                      'taperWindowStep', 1, ...
%                      'tau', 100, ...
%                      'pad', 2, ...
%                      'fPassBand', [0 EEG.srate/2], ...
%                      'maximumIterations', 10);
% [clnOutput, lineNoiseOut] = cleanLineNoise(signal, lineNoiseIn);
% EEG.data = clnOutput.data;

EEG.comments = pop_comments(EEG.comments,'','Filters applied, locutoff 1, hicutoff 60',1);

EEG = eeg_checkset(EEG);
[ALLEEG EEG CURRENTSET] = pop_newset(ALLEEG, EEG, 1,'setname',strcat(name,'_highpass'),...
    'savenew',strcat(fileDir,filesep,name,'_highpass'),'overwrite','on','gui','off');
end


%% Step 3: Epoch data %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
if idx <= 3
if idx == 3
EEG = pop_loadset('filename',strcat(fileDir,filesep,name,'_highpass.set'));
end

% this step will remove unwanted epochs such as end of the trail epoch
EEG = ft_CleanUpERPEvents_perSubject(EEG);

% epoch data, for freq analysis it will be -1 to 2 seconds, for time
% analysis it will be -0.2 to 2 seconds

EEG = pop_epoch(EEG, unique({EEG.event(:).type}), [-1 2], 'newname', strcat(name,'_epochs'), ...
'epochinfo', 'yes');

EEG.comments = pop_comments(EEG.comments,'','Epoched from -1000 to 2000 ms',1);

% normalises the eeg data by subtraction signal with baseline
rmBase = questdlg('Would you like to remove baseline?');
if strcmp(rmBase,'Yes')
    EEG = pop_rmbase(EEG,[-1000,0]);
    EEG.comments = pop_comments(EEG.comments,'','Removed baseline from -1000 to 0 ms',1);
end


[ALLEEG EEG CURRENTSET] = pop_newset(ALLEEG, EEG, 1,'setname',strcat(name,'_epochs'),...
    'savenew',strcat(fileDir,filesep,name,'_epochs'),'overwrite','on','gui','off'); 
EEG = eeg_checkset(EEG);

end

%% Step 4: Reject bad channels %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
if idx <= 4
if idx == 4
    EEG = pop_loadset('filename',strcat(fileDir,filesep,name,'_epochs.set'));
end

originalEEG = EEG;

% First remove bad channels by eye
disp('Identify bad channels by eye and remember their names.')
pop_eegplot(EEG); % view channels and write down bad channel names
uiwait()
EEG = pop_select(EEG); 
removedChansIdx = ~ismember({originalEEG.chanlocs(:).labels},...
    {EEG.chanlocs(:).labels});
if ~isempty(find(removedChansIdx))
    removedChans = strjoin({EEG.chanlocs(removedChansIdx).labels},', ');
    EEG.comments = pop_comments(EEG.comments,'',['Removed channels ', removedChans, 'by eye']);
end

originalEEG2 = EEG;

flag = 0;
while flag == 0
    
        % reject bad channels based on the selection
        EEG = pop_clean_rawdata(EEG);
        pop_eegplot(EEG)
        
        removedChans = strjoin({originalEEG2.chanlocs(~ismember({originalEEG2.chanlocs(:).labels},...
            {EEG.chanlocs(:).labels})).labels},', ');
        
        disp(['The removed channels are ', removedChans])
        
        uiwait()
        uiwait()
        close all
        
        load('cleanrawdata_options.mat')
        disp(options)
        
        comments = 'Bad channel rejection using cleanrawdata';
        
        redo = questdlg('Would you like to redo your channel rejection?');
        if strcmp(redo,'No')
            flag = 1;
        end

end

removedChansIdx = ~ismember({originalEEG2.chanlocs(:).labels},...
    {EEG.chanlocs(:).labels});

if ~isempty(removedChansIdx)
    removedChans = strjoin({originalEEG2.chanlocs(removedChansIdx).labels},', ');
    EEG.comments = pop_comments(EEG.comments,'',['Removed channels ', removedChans, ' with ', rejectionMethod]);
    removedChansIdx
    removedChans
end
EEG = eeg_checkset(EEG);

[ALLEEG EEG CURRENTSET] = pop_newset(ALLEEG, EEG, 1,'setname',strcat(name,'_rejchans'),...
    'savenew',strcat(fileDir,filesep,name,'_rejchans'),'overwrite','on','gui','off'); 
end

%% Step 5: Interpolate the removed channels %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
if idx <= 5
if idx == 5
    EEG = pop_loadset('filename',strcat(fileDir,filesep,name,'_rejchans.set'));
    originalEEG = pop_loadset('filename',strcat(fileDir,filesep,name,'_epochs.set'));
end

% Get number of channels before interpolation
numChannelsBeforeInterp = EEG.nbchan;
save(strcat(fileDir,filesep,'numChannelsBeforeInterp.mat'),'numChannelsBeforeInterp');

chans1 = {originalEEG.chanlocs.labels};
chans2 = {EEG.chanlocs.labels};
interpIdx = ~ismember(chans1,chans2);

chans1
chans2
interpIdx

interpChans = {originalEEG.chanlocs(interpIdx).labels};
interpTbl = table(find(interpIdx)',interpChans','VariableNames',{'ChannelIdx','ChannelName'});
writetable(interpTbl,strcat(fileDir,filesep,name,'_interp.txt'))

% Interpolate channels
EEG = pop_interp(EEG, originalEEG.chanlocs, 'spherical');
EEG.comments = pop_comments(EEG.comments,'',['Interpolated channels ' strjoin(interpChans,', ')],1);

[ALLEEG EEG CURRENTSET] = pop_newset(ALLEEG, EEG, 1,'setname',strcat(name,'_interp'),...
    'savenew',strcat(fileDir,filesep,name,'_interp'),'overwrite','on','gui','off'); 
end
%% Step 6: Re-reference to average %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
if idx <= 6
if idx == 6
EEG = pop_loadset('filename',strcat(fileDir,filesep,name,'_interp','.set'));
end

EEG = pop_reref(EEG, []);

EEG.comments = pop_comments(EEG.comments,'','Changed to average reference',1);

[ALLEEG EEG CURRENTSET] = pop_newset(ALLEEG, EEG, 1,'setname',strcat(name,'_averef'),...
    'savenew',strcat(fileDir,filesep,name,'_averef'),'overwrite','on','gui','off'); 
EEG = eeg_checkset(EEG);
end


%% Step 7: Run independent component analysis %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
if idx <= 7
if idx == 7
    EEG = pop_loadset('filename',strcat(fileDir,filesep,name,'_epochs_rejected.set'));
end

load(strcat(fileDir,filesep,'numChannelsBeforeInterp.mat'));
EEG = pop_runica(EEG, 'icatype', 'runica', 'extended',1,'interrupt','on','pca',numChannelsBeforeInterp-1);
EEG = eeg_checkset(EEG, 'ica');

EEG.comments = pop_comments(EEG.comments,'','Performed ICA',1);

[ALLEEG EEG CURRENTSET] = pop_newset(ALLEEG, EEG, 1,'setname',strcat(name,'_ica'),...
    'savenew',strcat(fileDir,filesep,name,'_ica'),'overwrite','on','gui','off'); 
end

%% Step 8: Reject bad components %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
if idx <= 8
if idx == 8
EEG = pop_loadset('filename',strcat(fileDir,filesep,name,'_ica.set'));

% reject bad components using iclabel

EEG = pop_iclabel(EEG,'default');
EEG = pop_icflag(EEG,[0 0;0.75 1;0.6 1;0.75 1;0.75 1;0.75 1;0.75 1]);    
rejectedCompIndex =find(EEG.reject.gcompreject == 1);

if(size(rejectedCompIndex, 1) > 0 )
    disp(['The removed components are ', string(rejectedCompIndex')]);
else
    disp('Zero components rejected');
end

EEG = pop_subcomp(EEG, find(EEG.reject.gcompreject), 0);    
EEG.comments = pop_comments(EEG.comments,'','Automated component rejection using ICALabel',1);

[ALLEEG EEG CURRENTSET] = pop_newset(ALLEEG, EEG, 1,'setname',strcat(name,'_comps_rejected'),...
    'savenew',strcat(fileDir, filesep,name,'_comps_rejected'),'overwrite','on','gui','off'); 
EEG = eeg_checkset(EEG);
end

%% Save as final version (to be easily retrieved for further analysis)
[ALLEEG EEG CURRENTSET] = pop_newset(ALLEEG, EEG, 1,'setname',strcat('final_',name),...
    'savenew',strcat(fileDir,filesep,'final_',name),'overwrite','on','gui','off'); 

EEG = eeg_checkset(EEG);
end
