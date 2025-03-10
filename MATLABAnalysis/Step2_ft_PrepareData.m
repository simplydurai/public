clc;
clear all;
close all;

%%
ft_ConfigureFieldTripSettings();
subject_list = setting.subject_to_process;
nsubj = length(subject_list); % number of subjects
nsession = 9;
sessionObj = struct;
sessionRegionObj = struct;
prestim = -0.5;
poststim = 1.5;
maxfoi = 60;
cfg_app = [];


    for s= 1: nsubj
            data_path  = char(setting.ftcleaneddataPath);
            foldername = char(strcat('P', subject_list{s}));
            filename = char(strcat(foldername, '/final_',foldername , '.set'));  

            % load EEGlab data
            EEG = pop_loadset('filename',filename, 'filepath', data_path);
            
            % rename the event from string to number for easy access of
            % trial events
            EEG = ft_RenameERPEvents_perSubject(EEG);

            % convert eeglab data to fieldtrip data
            data = eeglab2fieldtrip( EEG, 'raw', 'none' );

            % refine trails based on the stimulus length settings
            cfgi = [];   
            cfgi.trials = 1:360;
            cfgi.keepsampleinfo ='yes' ;
            cfgi.trialdef.prestim        = prestim; % in seconds
            cfgi.trialdef.poststim       = poststim; % in seconds            
            data = ft_redefinetrial(cfgi, data);

            sessionObj.sessiondata = {};   
            sessionRegionObj.sessionRegionData = {};

            % redo the low ass filter, avg reference and notch filter
            cfg = [];
            cfg.lpfilter       = 'yes';
            cfg.lpfreq         = maxfoi;
            cfg.demean              = 'yes';    % we demean (baseline correct) ...
            cfg.baselinewindow      = [prestim 0]; % using the mean activity in this window
            cfg.dftfilter           = 'yes';    % a notch filter ...
            cfg.dftfreq             = [50 100 60 120]; % hitting the (European) power frequency
                                                % (and its first harmonic)
%             cfg.channel             = 'EEG';
            cfg.reref               = 'yes';    % was recorded with left mastoid but is ...
            cfg.refchannel          = 'all';    % re-referenced to all (also called common average
            data                    = ft_preprocessing(cfg, data);  

            % extract session data seperately for easy analysis
        cfgsess1 = [];   
        cfgsess1.trials = 1:40;
        cfgsess1.keepsampleinfo ='yes' ;
        
        tmp = ft_redefinetrial(cfgsess1, data);
        sessionObj.sessiondata{end+1} = tmp;
        
        cfgsess2 = [];   
        cfgsess2.trials = 41:80;
        cfgsess2.keepsampleinfo ='yes' ;
        
        tmp = ft_redefinetrial(cfgsess2, data);
        sessionObj.sessiondata{end+1} = tmp;

        cfgsess3 = [];   
        cfgsess3.trials = 81:120;
        cfgsess3.keepsampleinfo ='yes' ;
        
        tmp = ft_redefinetrial(cfgsess3, data);
        sessionObj.sessiondata{end+1} = tmp;

        
        cfgsess4 = [];   
        cfgsess4.trials = 121:160;
        cfgsess4.keepsampleinfo ='yes' ;
        
        tmp = ft_redefinetrial(cfgsess4, data);
        sessionObj.sessiondata{end+1} = tmp;


        cfgsess5 = [];   
        cfgsess5.trials = 161:200;
        cfgsess5.keepsampleinfo ='yes' ;
        
        tmp = ft_redefinetrial(cfgsess5, data);
        sessionObj.sessiondata{end+1} = tmp;

        
        cfgsess6 = [];   
        cfgsess6.trials = 201:240;
        cfgsess6.keepsampleinfo ='yes' ;
        
        tmp = ft_redefinetrial(cfgsess6, data);
        sessionObj.sessiondata{end+1} = tmp;

        
        cfgsess7 = [];   
        cfgsess7.trials = 241:280;
        cfgsess7.keepsampleinfo ='yes' ;
        
        tmp = ft_redefinetrial(cfgsess7, data);
        sessionObj.sessiondata{end+1} = tmp;


        cfgsess8 = [];   
        cfgsess8.trials = 281:320;
        cfgsess8.keepsampleinfo ='yes' ;
        
        tmp = ft_redefinetrial(cfgsess8, data);
        sessionObj.sessiondata{end+1} = tmp;


        cfgsess9 = [];   
        cfgsess9.trials = 321:360;
        cfgsess9.keepsampleinfo ='yes' ;
        
        tmp = ft_redefinetrial(cfgsess9, data);
        sessionObj.sessiondata{end+1} = tmp;
 


        save(strcat(setting.ftsessiondataPath, subject_list{s}, '_sessiondata.mat') , '-struct', 'sessionObj', '-v7.3');
    end
    
        %% ------- save metadata

    metadata = struct;

    layout = ft_getLayoutInfo();
    % Increasing layout width and height
    layout.width = 0.0615 * ones(length(layout.width),1);
    layout.height = 0.0356 * ones(length(layout.height),1);
    metadata.layout = layout;

    [elec neighbours] = ft_getElectrodeInfo(data.label);
    metadata.electrodes = elec;
    metadata.neighbours = neighbours;

    metadata.headmodel = ft_headmodel_StdBEM();
    metadata.sourcemodel = ft_STDSourceModel();
    
    save(strcat(setting.ftdataPath, 'metadata.mat') , '-struct', 'metadata', '-v7.3');

    display('Finished !!!');

