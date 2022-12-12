input_question5 =
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
    '   "responses": ["I can predict the recurrence probability of breast cancer, please tell me which year you want to predict?","I would love to help you, Can you tell me your treatment time?" ]\n' +
    '  },\n' +

    '  {"tag": "race",\n' +
    ' "instruction": "choose the race of the patient",\n' +
    '  "nextques": "smoking",\n' +
    '  "patterns": {"White":"0","Black":"1","American Indian or Alaskan Native":"3","Asian":"2","Native Hawaiian or Other Pacific Islander":"4","Hispanic":"5"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "smoking",\n' +
    '  "instruction": "smoking history of patient",\n' +
    '  "nextques": "family_history",\n' +
    '  "patterns": {"ex smoker":"0", "non smoker":"1","cigarettes":"2" , "cigar":"4","chewing tobacco":"3"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "family_history",\n' +
    ' "instruction": "family history of cancer",\n' +
    '  "nextques": "age_at_diagnosis",\n' +
    '  "patterns": {"no family history of cancer":"1","family history of other cancer":"2","family history of this cancer":"3","family history of this and other cancer":"0","family history of cancer, nos":"4"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "age_at_diagnosis",\n' +
    ' "instruction": "choose the age at the diagnosis",\n' +
    '  "nextques": "TNEG",\n' +
    '  "patterns": {"0-49":"2","50-69":"1","greater than 69":"0"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "TNEG",\n' +
    ' "instruction": "triple negative status in terms of patient being ER, PR and HER2 negative",\n' +
    '  "nextques": "ER",\n' +
    '  "patterns": {"no triple negative status":"0","triple negative status":"1"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "ER",\n' +
    ' "instruction": "Receptors are proteins that attach to certain substances. Breast cancers that have estrogen receptors are called ER-positive. ER-low-positive status means low percentage  of tumour cells positively stained for ER by immunohistochemistry, while patients with tumours categorised as ER-negative had fewer percentage of ER.",\n' +
    '  "nextques": "ER_percent",\n' +
    '  "patterns": {"ER positive":"0","ER negative":"1","ER lowpositive":"2"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +

    '  },\n' +

    '  {"tag": "ER_percent",\n' +
    ' "instruction": "ER Percent means percent of cell stain positive for ER receptors",\n' +
    '  "nextques": "PR",\n' +
    '  "patterns": {"ER_percent:0-20":"1","ER_percent:20-90":"2","ER_percent:90-100":"0"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

     '  {"tag": "PR",\n' +
   ' "instruction": "PR-positive: Breast cancers with progesterone receptors are called PR-positive (or PR+) cancers.",\n' +
    '  "nextques": "PR_percent",\n' +
    '  "patterns": {"PR low-positive":"1","PR positive":"0","PR negative":"2"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "PR_percent",\n' +
    '  "instruction": "Receptors are proteins that attach to certain substances. Progesterone receptor (PR) tests look for receptors that attach to the hormones estrogen and progesterone in a sample of breast cancer tissue. PR Percent means percent of cell stain positive for PR receptors",\n' +
    '  "nextques": "P53",\n' +
    '  "patterns": {"PR_percent:0-20":"2", "PR_percent:20-90":"0","PR_percent:90-100":"1"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "P53",\n' +
    '  "instruction": "whether P53 is mutated.  p53 positivity was defined as a single malignant breast epithelial cell with positive nuclear staining for p53.",\n' +
    '  "nextques": "HER2",\n' +
    '  "patterns": {"P53 negative":"0", "P53 positive":"1","P53 low-positive":"2"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "HER2",\n' +
    ' "instruction": "composite of size and number of positive nodes",\n' +
    '  "nextques": "t_tnm_stage",\n' +
    '  "patterns": {"HER2 negative":"0","HER2 positive":"1"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "t_tnm_stage",\n' +
    ' "instruction": "prime tumor stage in TNM system.X means that the tumour size cannot be assessed. IS means ductal carcinoma in situ. It is a pre invasive breast cancer. 1 means that the tumour is 2 centimetres (cm) across or less. 2 means that the tumour is more than 2 centimetres but no more than 5 centimetres across. 3 means the tumour is bigger than 5 centimetres across. 4 means tumor has spread into other places",\n' +
    '  "nextques": "n_tnm_stage",\n' +
    '  "patterns": {"t_tnm_stage 0":"3","t_tnm_stage 1":"0","t_tnm_stage 2":"4","t_tnm_stage 3":"1","t_tnm_stage 4":"6","t_tnm_stage X":"7","t_tnm_stage IS":"2","t_tnm_stage 1mic":"5"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "n_tnm_stage",\n' +
    ' "instruction": "X: The lymph nodes were not evaluated. 0: Either of the following: no cancer was found in the lymph nodes or only areas of cancer smaller than 0.2 mm are in the lymph nodes. 1: The cancer has spread to 1 to 3 axillary lymph nodes and/or the internal mammary lymph nodes. 2: The cancer has spread to 4 to 9 axillary lymph nodes. 3: The cancer has spread to 10 or more axillary lymph nodes, or it has spread to the lymph nodes located under the clavicle, or collarbone. ",\n' +
    '  "nextques": "stage",\n' +
    '  "patterns": {"n_tnm_stage 0":"0","n_tnm_stage 1":"2","n_tnm_stage 2":"1","n_tnm_stage 3":"4","n_tnm_stage X":"3"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "stage",\n' +
    ' "instruction": "composite of size and number of positive nodes",\n' +
    '  "nextques": "lymph_node_positive",\n' +
    '  "patterns": {"stage 0":"3","stage 1":"0","stage 2":"2","stage 3":"1"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

     '  {"tag": "lymph_node_positive",\n' +
    ' "instruction": "number of positive lymph nodes. Lymph node status shows whether or not the lymph nodes in the underarm area (axillary lymph nodes) contain cancer: Lymph node-positive means at least one axillary lymph node contains cancer.",\n' +
    '  "nextques": "Histology",\n' +
    '  "patterns": {"0 positive lymph node":"0","1-8 positive lymph nodes":"2","greater than 8 positive lymph nodes":"1"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "Histology",\n' +
    ' "instruction": " A description of a tumor based on how abnormal the cancer cells and tissue look under a microscope and how quickly the cancer cells are likely to grow and spread. Ductal means an overgrowth of the cells that line the small tubes (ducts) inside the breast, while lobular is an overgrowth of cell lining the milk glands (lobules).",\n' +
    '  "nextques": "tumor_size",\n' +
    '  "patterns": {"Histology: duct":"1","Histology: mixed duct and lobular":"0","Histology: lobular":"2"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

      '  {"tag": "tumor_size",\n' +
   ' "instruction": "Size of tumor is measured in mm.",\n' +
    '  "nextques": "invasive_tumor_Location",\n' +
    '  "patterns": {"0-32":"0","32-70":"2","greater than 70":"1"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "invasive_tumor_Location",\n' +
    '  "instruction": "Where invasive tumor is located. Ductal means an overgrowth of the cells that line the small tubes (ducts) inside the breast, while lobular is an overgrowth of cell lining the milk glands (lobules).",\n' +
    '  "nextques": "DCIS_level",\n' +
    '  "patterns": {"mixed duct and lobular":"0", "duct":"2","lobular":"3","none":"1"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +


    '  {"tag": "DCIS_level",\n' +
    ' "instruction": "Choose the type of ductal carcinoma in situ. Ductal carcinoma in situ (DCIS) is the presence of abnormal cells inside a milk duct in the breast. DCIS is considered the earliest form of breast cancer. DCIS is noninvasive, meaning it has not spread out of the milk duct to invade other parts of the breast. ",\n' +
    '  "nextques": "surgical_margins",\n' +
    '  "patterns": {"solid":"0","apocrine":"2","cribriform":"3","dcis":"4", "comedo":"5","papillary":"6","micropapillary":"8","not present":"1"},\n' +
    '  "responses": ["What is the ","Could you tell me the "]\n' +
    '  },\n' +

    '  {"tag": "surgical_margins",\n' +
    ' "instruction": "whether there is a residual tumor",\n' +
    '  "nextques": "none",\n' +
    '  "patterns": {"no residual tumor":"0","microscopic residual tumor":"3","residual tumor,nos":"1","no primary site surgery":"2","margins not evaluable":"4"},\n' +
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






      '"Train a Model":[{"tag": "choice2",\n' +
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