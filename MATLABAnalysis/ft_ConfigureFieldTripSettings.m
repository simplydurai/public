function [setting] = ConfigureFieldTripSettings(NameValueArgs)

    arguments
        NameValueArgs.samplingRate  = 500
        NameValueArgs.freq_band_names = ["Delta" ; "Theta" ; "Alpha"; "Beta";"Gamma"; "AllFreq(1-30)"; "Freq(1-20)"; "Freq(1-8)" ]
        NameValueArgs.freq_bands = [1, 4 ; 4, 8 ; 8, 13; 13, 30; 30 ,60; 1, 30; 1,20; 1,8]
        NameValueArgs.timeSegment =4
        NameValueArgs.subject_to_process = ["1", "2", "3", "4", "5", "6",  "7", "9", "10", "11","12", "13", "14", "15", "16", "17", "18" ...
                    , "19", "20", "21" "22" "23", "24", "25", "26"];

        NameValueArgs.subject_habi = ["1", "2", "3", "4", "5","6" "7", "9", "10", "11" "12" "26"];
        NameValueArgs.subject_dishabi = ["13" "14" "15", "16", "17" "18" "19", "20", "21", "23", "24" "25" ];

        NameValueArgs.subject_lowbmi = ["1", "3", "4" "12" "26" "15" "17" "19" "20" "22" "24" "25"];
        NameValueArgs.subject_highbmi = ["2", "5", "6", "7", "9", "10", "11", "13", "14" "16", "18" "23"];

        NameValueArgs.subject_male = ["1", "2", "3", "4", "5", "7", "26", "14", "15", "17", "18", "20" ];
        NameValueArgs.subject_female = ["6", "9", "10", "11", "12" "13", "16", "19", "22", "23", "24", "25"];

        NameValueArgs.no_of_trials = 40
        NameValueArgs.no_of_images = 3
        NameValueArgs.sessions_list = [1,2,3,2,3,1,3,1,2];
    end
    
 fprintf("Setting Project Configuration \n");  

setting = struct;

setting.samplingRate = NameValueArgs.samplingRate;
setting.frequencyNameArray = NameValueArgs.freq_band_names;
setting.frequencyArray = NameValueArgs.freq_bands;
setting.timeSegment = NameValueArgs.timeSegment;
setting.subject_to_process = NameValueArgs.subject_to_process;
setting.no_of_trials = NameValueArgs.no_of_trials;
setting.no_of_images = NameValueArgs.no_of_images;
setting.sessions_list = NameValueArgs.sessions_list;
setting.subject_habi = NameValueArgs.subject_habi;
setting.subject_dishabi = NameValueArgs.subject_dishabi;
setting.subject_lowbmi = NameValueArgs.subject_lowbmi;
setting.subject_highbmi = NameValueArgs.subject_highbmi;
setting.subject_male = NameValueArgs.subject_male;
setting.subject_female = NameValueArgs.subject_female;
setting.no_of_channels = 32;
setting.filterInfo.ripple = 1;
setting.filterInfo.attenuation = 20;
setting.trials = [1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 ...
                                21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40];
setting.regions = {
    "frontal", {"Fp1", "Af3", "F7", "F3", "Fp2", "Af4", "F8", "F4", "Fc6", "Fc2", "Fc5", "Fc1", "Fz"};
    "parietal", {"P3", "P7", "PO3",  "P4", "P8", "PO4" "Pz"};
    "central", {"Cp5", "Cp1", "C3", "Fc5", "Fc1", "Cp6", "Cp2", "C4", "Fc6", "Fc2", "Cz"};
    "occipital", {"Oz", "O1", "O2"}
};



currentdirectory = pwd;

setting.basePath = string(currentdirectory);
setting.actualDataPath = strcat(setting.basePath, '/Data/');
setting.allDataPath = strcat(setting.basePath, '/Data/alldata/');
setting.fthomePath = strcat(setting.basePath , '/FieldTripAnalysis_new/');
setting.ftdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/');

% % 0.1Hz
% setting.ftcleaneddataPath = strcat(setting.allDataPath, '/CleanedDatav7/');
% setting.ftsessiondataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV7/SessionData/');
% setting.ftfreqdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV7/FreqData/');
% setting.ftfreqgrandavgdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV7/FreqGrandAvgData/');
% setting.fttimedataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV7/TimeData/');
% setting.fttimegrandavgdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV7/TimeGrandAvgData/');
% setting.ftfigurepath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV7/Figures/');

% 1Hz - Freq
setting.ftcleaneddataPath = strcat(setting.allDataPath, '/CleanedDatav3/');
setting.ftsessiondataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/SessionData/');
setting.ftfreqdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/FreqData/');
setting.ftfreqgrandavgdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/FreqGrandAvgData/');
setting.fttimedataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/TimeData/');
setting.fttimegrandavgdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/TimeGrandAvgData/');
setting.ftfigurepath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/Figures/');


% 1Hz - Time
setting.ftcleaneddataPath = strcat(setting.allDataPath, '/CleanedDatav3/');
setting.ftsessiondataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/TimeSessionData/');
% setting.ftfreqdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/TimeData/');
% setting.ftfreqgrandavgdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/TimeGrandAvgData/');
setting.fttimedataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/TimeData/');
setting.fttimegrandavgdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/TimeGrandAvgData/');



% % 1Hz
% setting.ftcleaneddataPath = strcat(setting.allDataPath, '/CleanedDataV3/');
% setting.ftsessiondataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/SessionData/');
% setting.ftfreqdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/FreqData/');
% setting.ftfreqgrpdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/FreqGrpData/');
% setting.ftfreqavgdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/FreqAvgData/');
% setting.ftfreqgrandavgdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/FreqGrandAvgData/');
% setting.fttimedataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/TimeData/');
% setting.fttimegrpdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/TimeGrpData/');
% setting.fttimegrandavgdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV3/TimeGrandAvgData/');

% 0.1Hz
% setting.ftcleaneddataPath = strcat(setting.allDataPath, '/CleanedDataV5/');
% setting.ftsessiondataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV5/SessionData/');
% setting.ftfreqdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV5/FreqData/');
% setting.ftfreqgrpdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV5/FreqGrpData/');
% setting.ftfreqavgdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV5/FreqAvgData/');
% setting.ftfreqgrandavgdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV5/FreqGrandAvgData/');
% setting.fttimedataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV5/TimeData/');
% setting.fttimegrpdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV5/TimeGrpData/');
% setting.fttimegrandavgdataPath = strcat(setting.basePath, '/FieldTripAnalysis_new/Data/CleanedV5/TimeGrandAvgData/');

if ~exist(setting.fttimegrandavgdataPath, 'dir')
   mkdir(setting.fttimegrandavgdataPath);
end

if ~exist(setting.ftsessiondataPath, 'dir')
   mkdir(setting.ftsessiondataPath);
end

if ~exist(setting.ftfreqdataPath, 'dir')
   mkdir(setting.ftfreqdataPath);
end

if ~exist(setting.ftfreqgrandavgdataPath, 'dir')
   mkdir(setting.ftfreqgrandavgdataPath);
end

if ~exist(setting.fttimedataPath, 'dir')
   mkdir(setting.fttimedataPath);
end

if ~exist(setting.ftfigurepath, 'dir')
   mkdir(setting.ftfigurepath);
end


channelIndex = [1;
2;
3;
4;
5;
6;
7;
8;
9;
10;
11;
12;
13;
14;
15;
16;
17;
18;
19;
20;
21;
22;
23;
24;
25;
26;
27;
28;
29;
30;
31;
32];

channelName = [      "P8";
      "T8";
     "CP6";
     "FC6";
     "F8";
      "F4";
      "C4";
      "P4";
     "AF4";
     "Fp2";
     "Fp1";
     "AF3";
      "Fz";
     "FC2";
      "Cz";
     "CP2";
     "PO3";
      "O1";
      "Oz";
      "O2";
     "PO4";
      "Pz";
     "CP1";
     "FC1";
      "P3";
      "C3";
      "F3";
      "F7";
     "FC5";
     "CP5";
      "T7";
      "P7";];

setting.channels = table(channelIndex, channelName);

assignin('base','setting',setting);
