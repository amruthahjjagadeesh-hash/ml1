// Centralized realistic sample curriculum data for SkillVerse AI
// Note: All content in this file represents curated sample academic data for frontend demonstration.

export const SAMPLE_ROADMAP = [
  {
    id: "step-1",
    step: "01",
    title: "Mathematics & Statistics Foundations",
    duration: "4 - 6 Weeks",
    level: "Essential Beginner",
    description: "The mathematical backbone of machine learning algorithms, optimization theory, and data distributions.",
    topics: [
      "Linear Algebra: Vector spaces, Matrix multiplication, Eigenvalues & Eigenvectors, SVD",
      "Multivariate Calculus: Partial derivatives, Gradients, Jacobians, Hessian matrices",
      "Probability & Stats: Bayes theorem, Normal/Poisson distributions, Expectation, Variance",
      "Hypothesis Testing: p-values, Confidence intervals, A/B testing principles"
    ],
    recommendedTools: ["NumPy", "SymPy", "Khan Academy Math", "3Blue1Brown"],
    badge: "Stage 1"
  },
  {
    id: "step-2",
    step: "02",
    title: "Python & Scientific Computing Stack",
    duration: "3 - 5 Weeks",
    level: "Core Competency",
    description: "Master modern Python 3 syntax, vectorized operations, data manipulation, and exploratory data analysis.",
    topics: [
      "Advanced Python: List/Dict comprehensions, Generators, Decorators, OOP for ML",
      "NumPy: Broadcasting, Vectorized arithmetic, Array slicing, Linear algebra ops",
      "Pandas: DataFrames, Cleaning missing values, GroupBy, Merges, Time-series",
      "Data Visualization: Matplotlib, Seaborn, Interactive plots with Plotly"
    ],
    recommendedTools: ["Python 3.11+", "NumPy", "Pandas", "JupyterLab"],
    badge: "Stage 2"
  },
  {
    id: "step-3",
    step: "03",
    title: "Core Machine Learning (Supervised & Unsupervised)",
    duration: "6 - 8 Weeks",
    level: "Intermediate",
    description: "Build, evaluate, and tune classical machine learning models with rigorous statistical validation.",
    topics: [
      "Regression: Ordinary Least Squares, Ridge, Lasso, ElasticNet",
      "Classification: Logistic Regression, Support Vector Machines (SVM), Decision Trees, Random Forests",
      "Ensemble Methods: XGBoost, LightGBM, CatBoost, Gradient Boosting",
      "Unsupervised Learning: K-Means, Hierarchical Clustering, PCA, t-SNE",
      "Evaluation Metrics: Precision, Recall, F1-Score, ROC-AUC, Log-Loss, Cross-validation"
    ],
    recommendedTools: ["Scikit-Learn", "XGBoost", "SciPy"],
    badge: "Stage 3"
  },
  {
    id: "step-4",
    step: "04",
    title: "Deep Learning & Neural Architectures",
    duration: "6 - 8 Weeks",
    level: "Advanced",
    description: "Deep dive into artificial neural networks, backpropagation, convolutional networks, and sequence models.",
    topics: [
      "Perceptrons & Multi-Layer Perceptrons (MLP), Activation functions (ReLU, GELU)",
      "Backpropagation algorithm, Optimizers (SGD, AdamW, RMSProp), Learning rate schedulers",
      "Convolutional Neural Networks (CNNs): ResNet, EfficientNet, Transfer Learning",
      "Recurrent Networks: LSTMs, GRUs, Attention Mechanisms, Positional Encodings"
    ],
    recommendedTools: ["PyTorch", "Torchvision", "TensorBoard", "Weights & Biases"],
    badge: "Stage 4"
  },
  {
    id: "step-5",
    step: "05",
    title: "Generative AI, Transformers & LLM Engineering",
    duration: "6 - 10 Weeks",
    level: "State of the Art",
    description: "Harness Transformer architectures, Large Language Models, Retrieval-Augmented Generation (RAG), and Fine-tuning.",
    topics: [
      "Transformer Deep Dive: Scaled dot-product self-attention, Multi-head attention",
      "Open-source LLMs: Llama-3, Mistral, Tokenization (BPE, WordPiece)",
      "RAG Systems: Vector Databases (Chroma, Pinecone), Embedding models, Chunking strategies",
      "Parameter Efficient Fine-Tuning (PEFT): LoRA, QLoRA, Prompt Engineering"
    ],
    recommendedTools: ["Hugging Face", "LangChain / LlamaIndex", "ChromaDB", "Ollama"],
    badge: "Stage 5"
  },
  {
    id: "step-6",
    step: "06",
    title: "MLOps, Deployment & Production Pipelines",
    duration: "4 - 6 Weeks",
    level: "Production Ready",
    description: "Package, deploy, monitor, and scale machine learning models into robust web APIs and cloud microservices.",
    topics: [
      "API Development: FastAPI, Pydantic data validation, async model inference",
      "Containerization: Dockerizing ML environments, multi-stage builds",
      "Pipelines & Tracking: MLflow, DVC for dataset versioning, GitHub Actions CI/CD",
      "Cloud Deployment & Monitoring: AWS/GCP, Drift detection, Prometheus & Grafana"
    ],
    recommendedTools: ["FastAPI", "Docker", "MLflow", "DVC", "GitHub Actions"],
    badge: "Stage 6"
  }
];

export const SAMPLE_COURSES = [
  {
    id: "course-1",
    title: "Complete Python for Data Science & AI",
    category: "Python",
    level: "Beginner to Intermediate",
    duration: "24 Hours (48 Lessons)",
    rating: 4.9,
    enrolled: "12,400+ students",
    description: "Comprehensive hands-on Python programming designed specifically for aspiring AI and ML developers.",
    modules: [
      "Python Basics, Control Flow & Data Structures",
      "Vectorized Math with NumPy & Array Manipulation",
      "Data Analysis & Feature Engineering with Pandas",
      "Interactive Visualization with Matplotlib & Seaborn",
      "Final Project: Automated Exploratory Data Analysis Toolkit"
    ],
    instructor: "Dr. Aisha Rahman, AI Research Fellow",
    badge: "Most Popular"
  },
  {
    id: "course-2",
    title: "Machine Learning Masterclass: From Theory to Scikit-Learn",
    category: "Machine Learning",
    level: "Intermediate",
    duration: "38 Hours (72 Lessons)",
    rating: 4.8,
    enrolled: "9,850+ students",
    description: "In-depth understanding of classical algorithms, bias-variance tradeoff, gradient descent, and production-ready models.",
    modules: [
      "Mathematical Foundations & Cost Function Minimization",
      "Regression Models & Regularization (L1 / L2)",
      "Classification Algorithms & Boundary Analysis",
      "Ensemble Learning with XGBoost and CatBoost",
      "Model Evaluation, Validation Curves, & Cross-Validation Strategies"
    ],
    instructor: "Vikram Malhotra, Lead ML Engineer",
    badge: "Core Track"
  },
  {
    id: "course-3",
    title: "Deep Learning & PyTorch for Vision and Language",
    category: "Deep Learning",
    level: "Advanced",
    duration: "42 Hours (65 Lessons)",
    rating: 4.9,
    enrolled: "7,120+ students",
    description: "Build custom neural networks, implement backprop from scratch, train vision models, and fine-tune Transformers.",
    modules: [
      "Tensors, Autograd & Computational Graphs in PyTorch",
      "Custom Dataset Loaders & Training Loop Best Practices",
      "Convolutional Neural Networks for Image Classification",
      "Sequence Modeling, Attention Mechanisms & Transformers",
      "Deploying PyTorch Models with TorchScript & ONNX"
    ],
    instructor: "Elena Rostova, Senior Research Scientist",
    badge: "Highest Rated"
  },
  {
    id: "course-4",
    title: "Full-Stack MLOps & Production Engineering",
    category: "MLOps",
    level: "Advanced",
    duration: "30 Hours (50 Lessons)",
    rating: 4.7,
    enrolled: "5,300+ students",
    description: "Bridge the gap between experimental Jupyter Notebooks and dependable, monitored production microservices.",
    modules: [
      "Building Fast ML Serving APIs with FastAPI",
      "Dockerization, GPU Pass-through & Container Optimization",
      "Experiment Tracking and Model Registry with MLflow",
      "Automated Testing & CI/CD Pipelines with GitHub Actions",
      "Monitoring Model Performance and Detecting Data Drift"
    ],
    instructor: "Marcus Chen, Staff Cloud Architect",
    badge: "Industry Focus"
  },
  {
    id: "course-5",
    title: "Data Structures & Algorithms in Python for AI Engineers",
    category: "Python",
    level: "Intermediate",
    duration: "20 Hours (35 Lessons)",
    rating: 4.8,
    enrolled: "8,900+ students",
    description: "Solve algorithmic problems, optimize computational complexity, and crack technical ML software interviews.",
    modules: [
      "Time & Space Complexity (Big-O analysis)",
      "Hash Maps, Sets, and Two-Pointer Techniques",
      "Trees, Graphs & Priority Queues (A*, Dijkstra)",
      "Dynamic Programming fundamentals for Optimization",
      "Top 50 Coding Interview Problems Walkthrough"
    ],
    instructor: "Kavita S., Senior Tech Interview Coach",
    badge: "Career Ready"
  },
  {
    id: "course-6",
    title: "Generative AI & LLM Application Development",
    category: "Deep Learning",
    level: "Advanced",
    duration: "28 Hours (40 Lessons)",
    rating: 4.9,
    enrolled: "11,500+ students",
    description: "Build robust Retrieval-Augmented Generation (RAG) pipelines, vector search systems, and fine-tuned models.",
    modules: [
      "Foundations of Large Language Models & Prompt Engineering",
      "Embeddings, Similarity Metrics & Vector Databases (Chroma/Pinecone)",
      "Building Production RAG Pipelines with LangChain",
      "Fine-Tuning Open Source Models with LoRA and QLoRA",
      "Evaluating RAG Systems with RAGAS & Guardrails"
    ],
    instructor: "David Sterling, Generative AI Specialist",
    badge: "Trending"
  }
];

export const SAMPLE_NOTES = [
  {
    id: "note-1",
    title: "Linear Algebra & Matrix Decompositions for ML",
    category: "Mathematics",
    readTime: "15 min read",
    updatedDate: "Updated October 2026",
    summary: "Essential vectors, eigenvalues, matrix decompositions, and geometric interpretations for data representation.",
    contentMarkdown: `### 1. Vector Spaces & Dot Products
A vector $\\mathbf{v} \\in \\mathbb{R}^n$ represents a data point with $n$ feature dimensions. The inner product (dot product) between vectors $\\mathbf{u}$ and $\\mathbf{v}$ determines cosine similarity:
$$\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^n u_i v_i = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos(\\theta)$$

### 2. Matrix Multiplication as Linear Transformation
Multiplying a data matrix $X$ by weight matrix $W$ scales, rotates, or projects the dimensional space into a new coordinate representation.

### 3. Principal Component Analysis (PCA) & Eigendecomposition
For a symmetric covariance matrix $\\Sigma = \\frac{1}{m} X^T X$:
$$\\Sigma \\mathbf{v} = \\lambda \\mathbf{v}$$
Where $\\lambda$ represents the variance explained along the eigenvector direction $\\mathbf{v}$. Sorting eigenvectors by descending eigenvalue yields optimal dimensionality reduction.`
  },
  {
    id: "note-2",
    title: "Gradient Descent Optimization & Learning Rate Dynamics",
    category: "Algorithms",
    readTime: "12 min read",
    updatedDate: "Updated October 2026",
    summary: "Mathematical formulation of Gradient Descent, Momentum, Adam optimizer, and learning rate scheduling.",
    contentMarkdown: `### 1. Batch vs. Stochastic Gradient Descent
The loss update formula for parameter vector $\\theta$:
$$\\theta_{t+1} = \\theta_t - \\eta \\nabla L(\\theta_t)$$
- **Batch GD:** Computes $\\nabla L$ across the entire dataset $N$. Stable but computationally prohibitive for large datasets.
- **SGD:** Updates parameters using 1 sample per step. Highly stochastic with zig-zag trajectories.
- **Mini-Batch GD:** Standard in modern deep learning (batch sizes 32 to 512).

### 2. Adam (Adaptive Moment Estimation)
Maintains exponentially decaying averages of past gradients ($m_t$) and squared gradients ($v_t$):
$$m_t = \\beta_1 m_{t-1} + (1-\\beta_1) g_t$$
$$v_t = \\beta_2 v_{t-1} + (1-\\beta_2) g_t^2$$
Applies bias corrections and updates parameters dynamically per coordinate.`
  },
  {
    id: "note-3",
    title: "The Bias-Variance Tradeoff & Regularization Techniques",
    category: "Machine Learning",
    readTime: "10 min read",
    updatedDate: "Updated October 2026",
    summary: "Deconstructing expected prediction error into Bias², Variance, and Irreducible Noise. How L1/L2 regularization fixes overfitting.",
    contentMarkdown: `### 1. The Decomposition Formula
$$\\text{Expected Error} = \\text{Bias}[\\hat{f}(x)]^2 + \\text{Var}[\\hat{f}(x)] + \\sigma^2$$
- **High Bias (Underfitting):** Model is overly rigid (e.g. Linear regression on non-linear data).
- **High Variance (Overfitting):** Model captures training noise instead of generalizable patterns.

### 2. L1 Regularization (Lasso) vs. L2 Regularization (Ridge)
- **Ridge (L2):** Adds $\\lambda \\sum \\theta_j^2$ to the loss. Drives weights uniformly toward zero without setting them exactly to 0.
- **Lasso (L1):** Adds $\\lambda \\sum |\\theta_j|$. Creates diamond-shaped constraint boundaries that zero out uninformative features, performing automatic feature selection.`
  },
  {
    id: "note-4",
    title: "Transformer Architecture & Self-Attention Equations",
    category: "Deep Learning",
    readTime: "18 min read",
    updatedDate: "Updated October 2026",
    summary: "Step-by-step breakdown of Query, Key, Value matrices, Scaled Dot-Product Attention, and Multi-Head projection.",
    contentMarkdown: `### 1. Scaled Dot-Product Attention
Given input sequence matrices projected into Query ($Q$), Key ($K$), and Value ($V$):
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{QK^T}{\\sqrt{d_k}} \\right) V$$
- The division by $\\sqrt{d_k}$ prevents gradients from vanishing when dimensionality $d_k$ is large.
- Softmax turns dot-product affinities into normalized probability attention weights over all token positions.

### 2. Multi-Head Attention (MHA)
Splitting attention into $h$ heads allows the model to simultaneously attend to information from different representation subspaces at different token distances.`
  }
];

export const SAMPLE_VIDEOS = [
  {
    id: "vid-1",
    title: "Understanding Gradient Descent & Loss Landscapes",
    category: "Optimization",
    videoUrl: "https://www.youtube.com/watch?v=IHZwWFHWa-w",
    duration: "24:15",
    instructor: "Prof. Alan Mitchell",
    thumbnailText: "Gradient Descent Visualized",
    views: "45K views",
    timestamps: [
      { time: "00:00", title: "Introduction & Cost Function Definition" },
      { time: "05:20", title: "Visualizing 3D Loss Landscapes" },
      { time: "11:45", title: "Learning Rate Oscillation & Divergence" },
      { time: "18:30", title: "Momentum & Adam Optimizer Comparison" }
    ],
    summary: "A visual and rigorous mathematical walkthrough of how optimization algorithms traverse complex parameter spaces to find global/local minima."
  },
  {
    id: "vid-2",
    title: "Deep Dive into Convolutional Neural Networks (CNNs)",
    category: "Computer Vision",
    videoUrl: "https://www.youtube.com/watch?v=KuXjwB4LzSA",
    duration: "32:40",
    instructor: "Dr. Aisha Rahman",
    thumbnailText: "CNNs From Scratch",
    views: "38K views",
    timestamps: [
      { time: "00:00", title: "Why Fully Connected Nets Fail on Images" },
      { time: "06:15", title: "Kernels, Filters, Stride & Padding" },
      { time: "16:20", title: "Feature Hierarchy: Edges to Complex Objects" },
      { time: "25:10", title: "Residual Connections (ResNet) Explained" }
    ],
    summary: "Understand how 2D convolution filters extract spatial hierarchical representations from image pixels and how skip connections solve vanishing gradients."
  },
  {
    id: "vid-3",
    title: "Transformers & Attention Mechanism Demystified",
    category: "NLP & Generative AI",
    videoUrl: "https://www.youtube.com/watch?v=eMlx5fFNoYc",
    duration: "41:10",
    instructor: "David Sterling",
    thumbnailText: "Attention Is All You Need",
    views: "62K views",
    timestamps: [
      { time: "00:00", title: "Recurrent Networks vs Parallel Attention" },
      { time: "08:50", title: "Constructing Query, Key, Value Tensors" },
      { time: "21:30", title: "Self-Attention Matrix Computation" },
      { time: "33:00", title: "Decoder Masking and Generation Loop" }
    ],
    summary: "The fundamental architecture behind GPT-4, Llama-3, and Claude explained with animated tensor diagrams and clear intuition."
  },
  {
    id: "vid-4",
    title: "Building & Deploying a Production ML API with FastAPI",
    category: "MLOps",
    videoUrl: "https://www.youtube.com/watch?v=h5wLuVDr0oc",
    duration: "28:50",
    instructor: "Marcus Chen",
    thumbnailText: "Production FastAPI Serving",
    views: "29K views",
    timestamps: [
      { time: "00:00", title: "Exporting Model Artifacts (Joblib / ONNX)" },
      { time: "07:15", title: "FastAPI Boilerplate & Pydantic Schemas" },
      { time: "15:40", title: "Async Request Handling & Batching" },
      { time: "22:10", title: "Dockerizing the Application Container" }
    ],
    summary: "Take a scikit-learn or PyTorch trained model and package it into an ultra-fast RESTful API with validation, docs, and Docker containerization."
  },
  {
    id: "vid-5",
    title: "HTML5 Direct Stream: Machine Learning Optimization Demo",
    category: "Direct Media",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "09:56",
    instructor: "SkillVerse AI Lab",
    thumbnailText: "Direct MP4 HTML5 Video",
    views: "18K views",
    timestamps: [
      { time: "00:00", title: "Introduction & Media Header" },
      { time: "02:15", title: "High Frame Rate Processing" },
      { time: "05:40", title: "Color Gradients & Compression" },
      { time: "08:10", title: "Final Render Output" }
    ],
    summary: "Native HTML5 direct video playback using <video> tag, custom browser controls, and instant buffering without third-party iframe dependencies."
  }
];

export const SAMPLE_PYQS = [
  {
    id: "pyq-1",
    exam: "University Final Exam / Technical Screening",
    year: "2025 - 2026",
    topic: "Overfitting & Regularization",
    difficulty: "Medium",
    question: "Explain the phenomenon of overfitting in Supervised Learning. Contrast how L1 (Lasso) and L2 (Ridge) regularization handle feature coefficients, and write the mathematical objective function for Ridge Regression.",
    solution: `### Model Solution:
1. **Definition of Overfitting:**
Overfitting occurs when a statistical model learns the detail and noise in the training data to the extent that it negatively impacts the performance of the model on unseen test data. The model exhibits low training loss but high generalization error (high variance).

2. **Ridge Regression Objective Function:**
Given target vector $\\mathbf{y}$, design matrix $X$, and coefficient vector $\\mathbf{w}$:
$$\\min_{\\mathbf{w}} \\frac{1}{2m} \\|X\\mathbf{w} - \\mathbf{y}\\|^2_2 + \\lambda \\|\\mathbf{w}\\|^2_2$$
Where $\\lambda > 0$ is the regularization hyperparameter controlling the penalty magnitude.

3. **L1 vs L2 Key Contrast:**
- **L2 Regularization (Ridge):** Penalty is quadratic $\\sum w_j^2$. It penalizes large weights heavily, shrinking all parameters smoothly toward zero, but never zeroing them out completely.
- **L1 Regularization (Lasso):** Penalty is linear absolute value $\\sum |w_j|$. Due to its sharp geometric vertices at zero axes, it forces non-informative weights exactly to zero, producing sparse models and acting as an embedded feature selection technique.`
  },
  {
    id: "pyq-2",
    exam: "Graduate ML Entrance / GATE CS Technical",
    year: "2024 - 2025",
    topic: "Logistic Regression & Sigmoid Derivation",
    difficulty: "Hard",
    question: "Derive the gradient of the Binary Cross-Entropy Loss function with respect to weight vector $\\mathbf{w}$ for Logistic Regression utilizing the standard sigmoid activation function $\\sigma(z)$.",
    solution: `### Model Solution:
1. **Sigmoid Derivative Identity:**
Let $z = \\mathbf{w}^T \\mathbf{x}$. The sigmoid function is $\\sigma(z) = \\frac{1}{1 + e^{-z}}$.
$$\\frac{d\\sigma(z)}{dz} = \\sigma(z)(1 - \\sigma(z))$$

2. **Binary Cross-Entropy Loss for single sample:**
$$L(\\mathbf{w}) = - [y \\ln(\\hat{y}) + (1-y) \\ln(1-\\hat{y})], \\quad \\text{where } \\hat{y} = \\sigma(\\mathbf{w}^T\\mathbf{x})$$

3. **Applying Chain Rule:**
$$\\frac{\\partial L}{\\partial w_j} = \\frac{\\partial L}{\\partial \\hat{y}} \\cdot \\frac{\\partial \\hat{y}}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w_j}$$
$$\\frac{\\partial L}{\\partial \\hat{y}} = -\\left[\\frac{y}{\\hat{y}} - \\frac{1-y}{1-\\hat{y}}\\right] = \\frac{\\hat{y} - y}{\\hat{y}(1-\\hat{y})}$$
$$\\frac{\\partial \\hat{y}}{\\partial z} = \\hat{y}(1 - \\hat{y}), \\quad \\frac{\\partial z}{\\partial w_j} = x_j$$
Multiplying the terms:
$$\\frac{\\partial L}{\\partial w_j} = \\frac{\\hat{y} - y}{\\hat{y}(1-\\hat{y})} \\cdot \\hat{y}(1-\\hat{y}) \\cdot x_j = (\\hat{y} - y)x_j$$
In vectorized notation across $m$ samples:
$$\\nabla_{\\mathbf{w}} L = \\frac{1}{m} X^T (\\hat{\\mathbf{y}} - \\mathbf{y})$$`
  },
  {
    id: "pyq-3",
    exam: "FAANG / AI Engineering Technical Interview",
    year: "2025",
    topic: "Evaluation Metrics under Severe Class Imbalance",
    difficulty: "Medium",
    question: "A medical diagnostics model detects a rare condition present in only 0.1% of patients. A dummy model that constantly predicts 'Negative' achieves 99.9% accuracy. Which evaluation metrics should be adopted instead, and why?",
    solution: `### Model Solution:
1. **The Accuracy Paradox:**
In severely imbalanced distributions (0.1% positive class), overall classification accuracy is deceptive because predicting the majority class trivially yields high accuracy while completely failing the clinical objective (diagnosing sick patients).

2. **Crucial Alternative Metrics:**
- **Recall (Sensitivity):** $\\frac{TP}{TP + FN}$. In medical diagnosis, False Negatives (missing a sick patient) are catastrophic. High recall guarantees sick patients are caught.
- **Precision:** $\\frac{TP}{TP + FP}$. Measures out of all flagged patients, how many truly have the condition. Prevents overwhelming healthcare staff with false alarms.
- **F-Beta Score:** Uses $\\beta = 2$ ($F_2$ score) to weight recall twice as heavily as precision.
- **Precision-Recall AUC (PR-AUC):** Far more informative than ROC-AUC when positive samples are extremely rare, as ROC-AUC false positive rate is diluted by the vast majority true negative count.`
  }
];

export const SAMPLE_PROJECTS = [
  {
    id: "proj-1",
    title: "Customer Churn Prediction & Retention Engine",
    difficulty: "Intermediate",
    category: "Supervised Learning",
    duration: "2 - 3 Weeks",
    dataset: "Telco Customer Churn (7,043 rows, 21 attributes)",
    techStack: ["Python", "Pandas", "Scikit-Learn", "XGBoost", "Streamlit"],
    overview: "Develop an end-to-end churn prediction pipeline with missing value imputation, categorical encoding, class reweighting (SMOTE), and an interactive risk dashboard.",
    keyFeatures: [
      "Exploratory Data Analysis revealing tenure and contract type risk drivers",
      "Feature engineering: Tenure buckets, monthly charges ratios",
      "Model benchmarking: Logistic Regression, Random Forest, XGBoost (AUC 0.86)",
      "SHAP value explanations for feature interpretability"
    ],
    githubRepo: "https://github.com/sample-portfolio/churn-prediction",
    liveDemoUrl: "#"
  },
  {
    id: "proj-2",
    title: "Pneumonia Detection from Chest X-Rays via Transfer Learning",
    difficulty: "Advanced",
    category: "Computer Vision",
    duration: "3 - 4 Weeks",
    dataset: "NIH Chest X-Ray Dataset (5,856 verified image scans)",
    techStack: ["PyTorch", "Torchvision", "ResNet-50", "Albumentations", "Gradio"],
    overview: "Build a convolutional deep neural network to assist radiologists in identifying bacterial vs. viral pneumonia with Grad-CAM visual heatmaps.",
    keyFeatures: [
      "Image augmentation pipeline: Random rotations, color jitter, affine transforms",
      "Fine-tuned pre-trained ResNet-50 with frozen early feature extraction layers",
      "Grad-CAM (Gradient-weighted Class Activation Mapping) for clinician explainability",
      "Precision: 94.2%, Sensitivity: 96.8% on holdout clinical test set"
    ],
    githubRepo: "https://github.com/sample-portfolio/chest-xray-pneumonia",
    liveDemoUrl: "#"
  },
  {
    id: "proj-3",
    title: "Enterprise Document RAG Assistant with Vector Search",
    difficulty: "State of the Art",
    category: "Generative AI",
    duration: "3 - 5 Weeks",
    dataset: "Internal Enterprise Technical PDF documentation corpus",
    techStack: ["Python", "LangChain", "ChromaDB", "Llama-3", "FastAPI", "React"],
    overview: "Construct a production-ready Retrieval-Augmented Generation system that indexes large PDF manuals, chunks content, generates dense vector embeddings, and answers domain questions.",
    keyFeatures: [
      "Recursive character text splitting with 200 token overlap",
      "Sentence-Transformers (all-MiniLM-L6-v2) embedding generator",
      "Cosine similarity retrieval with re-ranking via Cross-Encoder",
      "Hallucination mitigation via strict system prompts and source citation links"
    ],
    githubRepo: "https://github.com/sample-portfolio/rag-doc-assistant",
    liveDemoUrl: "#"
  },
  {
    id: "proj-4",
    title: "Real Estate Valuation & Price Forecasting Microservice",
    difficulty: "Intermediate",
    category: "Regression & MLOps",
    duration: "2 Weeks",
    dataset: "King County Housing Sales (21,613 transaction records)",
    techStack: ["Scikit-Learn", "LightGBM", "FastAPI", "Docker", "PyTest"],
    overview: "A production regression service trained to predict home market valuation based on geographical coordinates, square footage, and school ratings.",
    keyFeatures: [
      "Logarithmic transformation of skewed price targets",
      "Geospatial feature extraction (Haversine distance to urban center)",
      "Automated unit testing with PyTest and schema validation with Pydantic",
      "Dockerized microservice container with sub-25ms response latency"
    ],
    githubRepo: "https://github.com/sample-portfolio/house-price-api",
    liveDemoUrl: "#"
  }
];

export const VS_CODE_GUIDE = {
  title: "VS Code Setup Guide for AI & Machine Learning Engineers",
  summary: "Configure Visual Studio Code into a lightning-fast, production-grade ML workstation with Python virtual environments, Jupyter Notebooks, linting, and auto-formatting.",
  sections: [
    {
      step: 1,
      title: "Essential Extensions for AI & Python",
      details: "Install these curated extensions directly from the VS Code Extensions Marketplace (Ctrl+Shift+X):",
      items: [
        { name: "Python (Microsoft)", desc: "Provides rich IntelliSense, linting, debugging, code navigation, and syntax highlighting." },
        { name: "Pylance (Microsoft)", desc: "High-performance language server delivering type checking, auto-imports, and parameter info." },
        { name: "Jupyter (Microsoft)", desc: "Provides native interactive Jupyter Notebook (.ipynb) support inside VS Code." },
        { name: "Ruff (Astral)", desc: "Extremely fast Python linter and code formatter that replaces Flake8, Black, and isort." },
        { name: "GitLens", desc: "Supercharges Git inside VS Code with blame annotations, branch visualization, and commit history." }
      ]
    },
    {
      step: 2,
      title: "Setting Up Isolated Python Virtual Environments",
      details: "Always keep your ML project dependencies isolated. Avoid installing packages in global Python:",
      commands: [
        "# 1. Create a dedicated virtual environment in project root",
        "python -m venv .venv",
        "",
        "# 2. Activate in Windows PowerShell",
        ".\\.venv\\Scripts\\Activate.ps1",
        "",
        "# If execution policy prevents script running, run once in admin PowerShell:",
        "# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser",
        "",
        "# 3. Upgrade pip and install essential ML libraries",
        "python -m pip install --upgrade pip",
        "pip install numpy pandas scikit-learn matplotlib jupyterlab"
      ]
    },
    {
      step: 3,
      title: "Configuring settings.json for Clean Code Automation",
      details: "Add this configuration to your workspace `.vscode/settings.json` to enable auto-format on save and select your virtual environment automatically:",
      codeSnippet: `{
  "python.defaultInterpreterPath": "\${workspaceFolder}/.venv/Scripts/python.exe",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "charliermarsh.ruff",
  "notebook.formatOnSave.enabled": true,
  "python.analysis.typeCheckingMode": "basic",
  "files.autoSave": "onFocusChange"
}`
    },
    {
      step: 4,
      title: "Top Keyboard Shortcuts for Speed",
      shortcuts: [
        { key: "Ctrl + `", action: "Toggle integrated terminal" },
        { key: "Ctrl + Shift + P", action: "Open Command Palette (e.g. 'Python: Select Interpreter')" },
        { key: "Shift + Enter", action: "Run current cell or line in interactive Python/Jupyter window" },
        { key: "Alt + Up / Down", action: "Move selected line up or down" },
        { key: "Ctrl + /", action: "Toggle comment on selected lines" }
      ]
    }
  ]
};

export const GITHUB_GUIDE = {
  title: "Git & GitHub Engineering Workflow for Machine Learning",
  summary: "Master version control best practices tailored for data scientists and ML engineers, including commit standards, branch workflows, and large file handling.",
  sections: [
    {
      step: 1,
      title: "Git Setup & First Commit",
      details: "Initialize version control in your project directory and set your identity:",
      commands: [
        "# Set global identity",
        'git config --global user.name "Your Name"',
        'git config --global user.email "your.email@example.com"',
        "",
        "# Initialize Git in your project folder",
        "git init",
        "",
        "# Stage files and create first commit",
        "git add .",
        'git commit -m "feat: initial commit for SkillVerse AI"'
      ]
    },
    {
      step: 2,
      title: "The Essential .gitignore for Machine Learning Projects",
      details: "CRITICAL: Never commit virtual environments, credentials (.env), dataset dumps (.csv, .zip), or multi-gigabyte model weights (.pth, .onnx, .bin) directly to GitHub!",
      sampleGitignore: `# Virtual environments
.venv/
venv/
env/

# Python cache & build
__pycache__/
*.py[cod]
dist/
build/

# Jupyter Notebook checkpoints
.ipynb_checkpoints/

# Environment secrets & keys
.env
*.pem
secrets.json

# Large datasets and model checkpoints (Use DVC or Git LFS instead)
data/*.csv
data/*.parquet
data/raw/
models/*.pth
models/*.bin
models/*.onnx
`
    },
    {
      step: 3,
      title: "Branching Strategy & Pull Request Workflow",
      details: "Follow industry-standard feature branching instead of pushing directly to main:",
      commands: [
        "# 1. Create and switch to a new feature branch",
        "git checkout -b feature/model-training-pipeline",
        "",
        "# 2. Make your code changes and commit with conventional messages",
        "git add src/train.py",
        'git commit -m "feat(training): add cross-validation loop and MLflow logging"',
        "",
        "# 3. Push branch to remote GitHub repository",
        "git push -u origin feature/model-training-pipeline",
        "",
        "# 4. Open a Pull Request (PR) on GitHub.com for peer review and automated testing"
      ]
    },
    {
      step: 4,
      title: "Tracking Datasets & Weights with DVC (Data Version Control)",
      details: "For files exceeding GitHub's 100MB limit, use DVC alongside Git:",
      commands: [
        "pip install dvc",
        "dvc init",
        "# Track large dataset without putting raw bytes in Git",
        "dvc add data/training_dataset.parquet",
        "git add data/training_dataset.parquet.dvc .gitignore",
        'git commit -m "chore: track training dataset via DVC"'
      ]
    }
  ]
};
