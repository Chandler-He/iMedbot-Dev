input_question =
    '  {' +
    '"START":[{"tag": "Instruction",\n' +
    ' "instruction": "We can either predict the probability of recurrence or help you train a model online.",\n' +
    '  "nextques": "Predict or Train a Model",\n' +
    '   "patterns": {"Predict":"1","Train a Model":"2"},\n' +
    '   "responses": ["I can either predict breast cancer metastasis for your patient based on our deep learning models trained using one existing dataset,or I can train a model for you if you can provide your own dataset, so how do you want to proceed?Please enter 1 for the first choice, or 2 for the second choice"]\n'+
    '  }],\n' +

    '"Predict": [' +
    '{"tag": "treatment_year",\n' +
    ' "instruction": "Please choose the treatment year",\n' +
    '  "nextques": "race",\n' +
    '   "patterns": {"5 year":"5","10 year":"10","15 year":"15"},\n' +
    '   "responses": ["I can predict the recurrence probability of breast cancer, please tell me which year you want to predict?","I would love to help you, Can you tell me your treatment time?"]\n' +
    '  },\n' +

    '  {"tag": "race",\n' +
    ' "instruction": "choose the race of the patient",\n' +
    '  "nextques": "alcohol_useage",\n' +
    '  "patterns": {"White":"0","Black":"1","American Indian or Alaskan Native":"2","Asian":"3","Native Hawaiian or Other Pacific Islander":"4","Hispanic":"5"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

     '  {"tag": "alcohol_useage",\n' +
    ' "instruction": "Choose the frequency of alcohol useage",\n' +
    '  "nextques": "age_at_diagnosis",\n' +
    '  "patterns": {"alcohol use, nos":"0","no alcohol use":"1","moderate alcohol use":"2","former alcohol use":"3"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "age_at_diagnosis",\n' +
    ' "instruction": "choose the age at the diagnosis",\n' +
    '  "nextques": "menopause_status",\n' +
    '  "patterns": {"0-49":"0","50-69":"1","greater than 69":"2"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +
    '  {"tag": "menopause_status",\n' +
    ' "instruction": "Menopause is a normal stage of life for woman in which she has not had a period for 12 months. The months or years leading up to menopause are called perimenopause (or premenopause). The years after menopause are called postmenopause.",\n' +
    '  "nextques": "ER",\n' +
    '  "patterns": {"menopause post":"0","menopause pre":"1"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +
    '  {"tag": "ER",\n' +
    ' "instruction": "Receptors are proteins that attach to certain substances. Breast cancers that have estrogen receptors are called ER-positive. ER-low-positive status means low percentage  of tumour cells positively stained for ER by immunohistochemistry, while patients with tumours categorised as ER-negative had fewer percentage of ER.",\n' +
    '  "nextques": "ER_percent",\n' +
    '  "patterns": {"ER-positive":"0","ER-negative":"1","ER-lowpositive":"2"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +
    '  {"tag": "ER_percent",\n' +
    ' "instruction": "ER Percent means percent of cell stain positive for ER receptors",\n' +
    '  "nextques": "t_tnm_stage",\n' +
    '  "patterns": {"0-20":"1","20-90":"2","90-100":"0"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +
    '  {"tag": "t_tnm_stage",\n' +
    ' "instruction": "prime tumor stage in TNM system.X means that the tumour size cannot be assessed. IS means ductal carcinoma in situ. It is a pre invasive breast cancer. 1 means that the tumour is 2 centimetres (cm) across or less. 2 means that the tumour is more than 2 centimetres but no more than 5 centimetres across. 3 means the tumour is bigger than 5 centimetres across. 4 means tumor has spread into other places",\n' +
    '  "nextques": "n_tnm_stage",\n' +
    '  "patterns": {"t_tnm_stage 0":"6","t_tnm_stage 1":"0","t_tnm_stage 2":"2","t_tnm_stage 3":"1","t_tnm_stage 4":"3","t_tnm_stage X":"4","t_tnm_stage IS":"5","t_tnm_stage 1mic":"7"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +
    '  {"tag": "n_tnm_stage",\n' +
    ' "instruction": "X: The lymph nodes were not evaluated. 0: Either of the following: no cancer was found in the lymph nodes or only areas of cancer smaller than 0.2 mm are in the lymph nodes. 1: The cancer has spread to 1 to 3 axillary lymph nodes and/or the internal mammary lymph nodes. 2: The cancer has spread to 4 to 9 axillary lymph nodes. 3: The cancer has spread to 10 or more axillary lymph nodes, or it has spread to the lymph nodes located under the clavicle, or collarbone. ",\n' +
    '  "nextques": "stage",\n' +
    '  "patterns": {"n_tnm_stage 0":"1","n_tnm_stage 1":"0","n_tnm_stage 2":"2","n_tnm_stage 3":"4","n_tnm_stage X":"3"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +
    '  {"tag": "stage",\n' +
    ' "instruction": "composite of size and number of positive nodes",\n' +
    '  "nextques": "lymph_node_status",\n' +
    '  "patterns": {"stage 0":"3","stage 1":"0","stage 2":"2","stage 3":"1"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +
    '  {"tag": "lymph_node_status",\n' +
    ' "instruction": "Lymph node status shows whether or not the lymph nodes in the underarm area (axillary lymph nodes) contain cancer: Lymph node-negative means none of the axillary lymph nodes contain cancer. Lymph node-positive means at least one axillary lymph node contains cancer.",\n' +
    '  "nextques": "Histology",\n' +
    '  "patterns": {"lymph_node-negative":"0","lymph_node-positive":"1"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +
    '  {"tag": "Histology",\n' +
    ' "instruction": " A description of a tumor based on how abnormal the cancer cells and tissue look under a microscope and how quickly the cancer cells are likely to grow and spread. Ductal means an overgrowth of the cells that line the small tubes (ducts) inside the breast, while lobular is an overgrowth of cell lining the milk glands (lobules).",\n' +
    '  "nextques": "tumor_size",\n' +
    '  "patterns": {"Histology: duct":"0","Histology: mixed duct and lobular":"1","Histology: lobular":"2"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +
    '  {"tag": "tumor_size",\n' +
   ' "instruction": "Size of tumor is measured in mm.",\n' +
    '  "nextques": "grade",\n' +
    '  "patterns": {"0-32":"0","32-70":"1","greater than 70":"2"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "grade",\n' +
    '  "instruction": "Grade of disease: grade 1 – looks most like normal breast cells and is usually slow-growing; grade 2 – looks less like normal cells and is growing faster; grade 3 – looks different to normal breast cells and is usually fast-growing",\n' +
    '  "nextques": "histology2",\n' +
    '  "patterns": {"grade1":"0","grade2":"1","grade3":"2"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +
    '  {"tag": "histology2",\n' +
    ' "instruction": "tumor histology subtypes.Invasive (infiltrating) ductal carcinoma (IDC). Invasive lobular carcinoma (ILC). DCIS is also called intraductal carcinoma or stage 0 breast cancer. DCIS is a non-invasive or pre-invasive breast cancer. ",\n' +
    '  "nextques": "invasive_tumor_Location",\n' +
    '  "patterns": {"histology2 IDC":"0","histology2 ILC":"1","histology2 DCIS":"2","histology2 NC":"3"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +


    '  {"tag": "invasive_tumor_Location",\n' +
    '  "instruction": "Where invasive tumor is located. Ductal means an overgrowth of the cells that line the small tubes (ducts) inside the breast, while lobular is an overgrowth of cell lining the milk glands (lobules).",\n' +
    '  "nextques": "re_excision",\n' +
    '  "patterns": {"mixed duct and lobular":"1", "duct":"0","lobular":"2","none":"3"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +
    '  {"tag": "re_excision",\n' +
    ' "instruction": "whether the patient has removal of an additional margin of tissue",\n' +
    '  "nextques": "surgical_margins",\n' +
    '  "patterns": {"re_excision":"0","no re_excision":"1"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n'+

    '  {"tag": "surgical_margins",\n' +
    ' "instruction": "whether there is a residual tumor",\n' +
    '  "nextques": "none",\n' +
    '  "patterns": {"no residual tumor":"0","microscopic residual tumor":"1","residual tumor,nos":"2","no primary site surgery":"3","margins not evaluable":"4"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  }],\n' +



    // '  {"tag": "race",\n' +
    //' "instruction": "treatment_year instruction",\n' +
    // '  "nextques": "menopause_status",\n' +
    // '  "patterns": ["Asian", "American Indian","Hispanic or Latino","White" ],\n' +
    // '  "responses": ["What is your race?"]' +
    // '  },\n' +

    // '  {"tag": "menopause_status",\n' +
    //' "instruction": "treatment_year instruction",\n' +
    // '  "nextques": "none",\n' +
    // '  "patterns": ["0", "1","2"],\n' +
    // '  "responses": ["What is your menopause_status?"]' +
    // '  }\n' +





      '"Train a Model":[\n'+
      '{"tag": "choice2",\n' +
    ' "instruction": "Browse data",\n' +
    '  "nextques": "View your dataset",\n' +
    '   "patterns": {"Example Dataset":"1","Browse Local":"2"},\n' +
    '   "responses": ["Please review the demo dataset first and upload your local dataset, only .txt and .csv format are permitted"]'+
    '  },' +
    '{"tag": "View your dataset",\n' +
    ' "instruction": "View your dataset",\n' +
    '  "nextques": "",\n' +
    '   "patterns": {"View your dataset":"1"},\n' +
    '   "responses": ["Please check the chuhan dataset you uploaded and it will give your some basic stats"]'+
    '  }]\n'+
    '}'

