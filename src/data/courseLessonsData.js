// Comprehensive lesson and module curriculum data for SkillVerse AI courses

export const COURSE_LESSONS_MAP = {
  "course-1": {
    modules: [
      {
        id: "c1-m1",
        title: "Module 1: Python Basics, Control Flow & Data Structures",
        lessons: [
          {
            id: "c1-m1-l1",
            title: "Lesson 1: Python Variables, Types & Memory Model",
            duration: "18 mins",
            explanation: `Python is a dynamically typed, high-level language where everything is an object. Variables do not store values directly; instead, they store references (memory pointers) to objects in the heap.\n\nIn machine learning, understanding data types (int, float, bool, str) and mutability is critical because passing mutable arrays or dictionaries into training functions can cause inadvertent side effects if you mutate them in-place.`,
            keyTakeaways: [
              "Primitive types in Python (int, float, str, bool) are immutable.",
              "Use 'id(obj)' to inspect memory addresses and understand variable references.",
              "Type annotations (e.g. def predict(features: list[float]) -> float:) improve readability and IDE autocomplete."
            ],
            pythonExample: `# Python Memory & Typing Demonstration for AI
def inspect_object(name: str, value: any) -> None:
    print(f"{name}: Value={value}, Type={type(value).__name__}, ID={id(value)}")

# Primitive types (immutable)
learning_rate: float = 0.001
epochs: int = 100
model_name: str = "LinearRegressor"

inspect_object("learning_rate", learning_rate)
inspect_object("epochs", epochs)

# Demonstrating mutability vs re-assignment
weights = [0.25, -0.45, 0.88]
print(f"Original weights memory address: {id(weights)}")
weights.append(0.12)  # In-place mutation (same memory address)
print(f"After append memory address:    {id(weights)}")`,
            practiceChallenge: "Write a function 'compute_loss_weights(weights: list[float], scale: float) -> list[float]' that returns a new list of scaled weights without modifying the original weights list."
          },
          {
            id: "c1-m1-l2",
            title: "Lesson 2: Control Flow, Iterators & List Comprehensions",
            duration: "22 mins",
            explanation: `Efficient control flow forms the backbone of data preprocessing pipelines. List and dictionary comprehensions in Python provide clean, expressive syntax that executes significantly faster than traditional for-loops with repeated .append() calls.\n\nComprehensions leverage underlying C-level bytecode loops in CPython, minimizing overhead when filtering datasets, normalizing feature values, or tokenizing text.`,
            keyTakeaways: [
              "List comprehensions: [expression for item in iterable if condition]",
              "Dictionary comprehensions: {key_fn(x): val_fn(x) for x in iterable}",
              "Use enumerate() for tracking iteration indices rather than range(len(list)).",
              "Use zip() to pair features and labels cleanly."
            ],
            pythonExample: `# Cleaning and Normalizing Raw ML Features with Comprehensions
raw_features = [12.5, -999.0, 45.2, None, 18.0, 99.4, -999.0]

# Filter out missing values (None and -999 sentinel values)
clean_features = [x for x in raw_features if x is not None and x != -999.0]
print("Cleaned Features:", clean_features)

# Min-Max Normalization via list comprehension: (x - min) / (max - min)
min_val, max_val = min(clean_features), max(clean_features)
normalized = [(x - min_val) / (max_val - min_val) for x in clean_features]

# Display paired raw and normalized values with zip
for raw, norm in zip(clean_features, normalized):
    print(f"Original: {raw:5.1f}  -->  Normalized: {norm:.3f}")`,
            practiceChallenge: "Using a dictionary comprehension, transform a list of feature names ['age', 'income', 'credit_score'] and standard deviations [5.2, 12000.0, 45.0] into a feature variance map where variance = std_dev ** 2."
          }
        ]
      },
      {
        id: "c1-m2",
        title: "Module 2: Vectorized Math with NumPy & Array Manipulation",
        lessons: [
          {
            id: "c1-m2-l1",
            title: "Lesson 1: NumPy Arrays & Vectorized Broadcasting",
            duration: "25 mins",
            explanation: `NumPy (Numerical Python) is the foundational library for all scientific computing and machine learning in Python. A NumPy ndarray contains contiguous homogeneous memory blocks, allowing SIMD (Single Instruction, Multiple Data) CPU hardware acceleration.\n\nBroadcasting allows arithmetic operations between arrays of different shapes without copying data in memory, adhering to strict dimension-matching rules starting from trailing dimensions.`,
            keyTakeaways: [
              "Vectorized operations eliminate slow Python interpreter for-loops.",
              "Broadcasting rules: Dimensions are compatible if they are equal or one of them is 1.",
              "Always prefer matrix operations (np.dot, @ operator) over nested loops for dot products."
            ],
            pythonExample: `import numpy as np

# Sample feature matrix X: 4 samples, 3 features
X = np.array([
    [1.5, 2.0, 3.2],
    [2.1, 1.8, 4.0],
    [0.9, 3.1, 2.5],
    [3.4, 2.5, 1.1]
])

# Weight vector W: 3 features
W = np.array([0.5, -0.2, 0.8])
# Bias scalar
b = 0.15

# Vectorized forward pass: Linear combination y_hat = X @ W + b
predictions = X @ W + b

print("Input Matrix Shape:", X.shape)
print("Weight Vector Shape:", W.shape)
print("Computed Predictions:", np.round(predictions, 4))`,
            practiceChallenge: "Create a 5x4 random matrix representing 5 data samples with 4 features. Compute the mean and standard deviation along each column (axis=0) and standardize the matrix: Z = (X - mean) / std."
          },
          {
            id: "c1-m2-l2",
            title: "Lesson 2: Matrix Decompositions & Slicing for Data Prep",
            duration: "20 mins",
            explanation: `Data preparation often requires slicing matrices into training and validation subsets, masking specific columns, and performing operations like matrix inversion or Singular Value Decomposition (SVD).\n\nNumPy views allow slicing without copying memory, whereas boolean masking creates new filtered arrays.`,
            keyTakeaways: [
              "Slicing syntax: array[start:stop:step, col_start:col_stop]",
              "Boolean indexing: array[array > threshold] filters elements conditionally.",
              "Use np.linalg.pinv() for Moore-Penrose pseudo-inversion in Ordinary Least Squares."
            ],
            pythonExample: `import numpy as np

# Generate synthetic dataset: 6 samples with [Feature1, Feature2, Target]
dataset = np.array([
    [25, 50000, 1],
    [45, 85000, 1],
    [19, 15000, 0],
    [35, 62000, 1],
    [22, 28000, 0],
    [52, 95000, 1]
], dtype=float)

# Slice into features (all rows, columns 0 and 1) and labels (column 2)
X = dataset[:, :2]
y = dataset[:, 2]

print("Features X:\n", X)
print("Labels y:", y)

# Boolean filtering: Extract high-income profiles (income > 50,000)
high_earners = dataset[dataset[:, 1] > 50000]
print("High Earners Count:", len(high_earners))`,
            practiceChallenge: "Implement the normal equation W = (X^T X)^(-1) X^T y from scratch in NumPy for a simple 3x2 matrix X and 3x1 target vector y."
          }
        ]
      },
      {
        id: "c1-m3",
        title: "Module 3: Data Analysis & Feature Engineering with Pandas",
        lessons: [
          {
            id: "c1-m3-l1",
            title: "Lesson 1: DataFrames, Cleaning & Handling Missing Values",
            duration: "26 mins",
            explanation: `Pandas is built on top of NumPy and provides tabular DataFrames with row indices and column labels. Real-world datasets are messy: containing NaNs, erroneous entries, and mixed types.\n\nFeature engineering involves detecting missing patterns (MCAR, MAR, MNAR) and choosing between drop policies, mean/median imputation, or domain-specific sentinel encoding.`,
            keyTakeaways: [
              "df.info() and df.describe() provide rapid distributional inspection.",
              "Use df.isna().sum() to quantify missing value density per column.",
              "Avoid chained indexing (df['a']['b'] = c); use df.loc[row_indexer, col_indexer]."
            ],
            pythonExample: `import pandas as pd
import numpy as np

# Creating a messy sample ML customer dataset
data = {
    'CustomerID': [101, 102, 103, 104, 105],
    'Age': [29, np.nan, 42, 36, np.nan],
    'MonthlySpend': [120.5, 450.0, np.nan, 89.0, 310.2],
    'Subscribed': ['Yes', 'No', 'Yes', 'No', 'Yes']
}
df = pd.DataFrame(data)
print("Original DataFrame:\n", df)

# Median imputation for numerical columns
df['Age'] = df['Age'].fillna(df['Age'].median())
df['MonthlySpend'] = df['MonthlySpend'].fillna(df['MonthlySpend'].median())

# Binary encoding of target column
df['Subscribed_Code'] = (df['Subscribed'] == 'Yes').astype(int)
print("\nCleaned & Encoded DataFrame:\n", df)`,
            practiceChallenge: "Write a function that accepts a Pandas DataFrame and returns a summary report DataFrame with columns: ['Column_Name', 'Missing_Count', 'Missing_Percentage', 'Data_Type']."
          },
          {
            id: "c1-m3-l2",
            title: "Lesson 2: GroupBy Aggregations & One-Hot Encoding",
            duration: "24 mins",
            explanation: `Feature engineering transforms raw categorical variables and timestamps into numerical representations that machine learning algorithms can ingest.\n\nGrouping and aggregations allow computing historical customer statistics (e.g. mean transaction amount per customer), while pd.get_dummies() or OneHotEncoder transforms nominal categories into indicator matrices.`,
            keyTakeaways: [
              "GroupBy follows the Split-Apply-Combine paradigm.",
              "pd.get_dummies(drop_first=True) avoids collinearity / the dummy variable trap.",
              "Never fit encoders on test data; always fit on train and transform on test."
            ],
            pythonExample: `import pandas as pd

# Transaction logs
logs = pd.DataFrame({
    'Category': ['Electronics', 'Clothing', 'Electronics', 'Home', 'Clothing'],
    'PaymentMethod': ['Card', 'PayPal', 'Card', 'Card', 'Cash'],
    'Amount': [420.0, 75.5, 1290.0, 110.0, 45.0]
})

# 1. GroupBy aggregate: Total and Average spend by Category
summary = logs.groupby('Category')['Amount'].agg(['count', 'mean', 'sum']).reset_index()
print("Category Spend Summary:\n", summary)

# 2. One-Hot Encoding for nominal PaymentMethod
encoded_logs = pd.get_dummies(logs, columns=['PaymentMethod'], drop_first=True)
print("\nOne-Hot Encoded Logs:\n", encoded_logs)`,
            practiceChallenge: "Given a DataFrame of user transactions, calculate each user's total spending and their average transaction amount using a single groupby aggregation."
          }
        ]
      },
      {
        id: "c1-m4",
        title: "Module 4: Interactive Visualization with Matplotlib & Seaborn",
        lessons: [
          {
            id: "c1-m4-l1",
            title: "Lesson 1: Distributions, Boxplots & Outlier Identification",
            duration: "20 mins",
            explanation: `Exploratory Data Analysis (EDA) requires visualizing feature distributions and outlier frequencies before selecting model architectures.\n\nHistograms and Kernel Density Estimates (KDE) reveal skewness, while boxplots visually identify values exceeding 1.5 times the Interquartile Range (IQR).`,
            keyTakeaways: [
              "Matplotlib's Object-Oriented API (fig, ax = plt.subplots()) gives full structural control.",
              "Seaborn builds on top of Matplotlib, optimizing statistical visualizations.",
              "Outliers can be detected via IQR: Outlier if x < Q1 - 1.5*IQR or x > Q3 + 1.5*IQR."
            ],
            pythonExample: `import matplotlib.pyplot as plt
import numpy as np

# Simulate feature data with a few severe outliers
np.random.seed(42)
normal_data = np.random.normal(loc=50, scale=10, size=200)
outliers = np.array([115, 125, -10])
feature_values = np.concatenate([normal_data, outliers])

# Compute IQR Bounds
q25, q75 = np.percentile(feature_values, [25, 75])
iqr = q75 - q25
lower_bound = q25 - (1.5 * iqr)
upper_bound = q75 + (1.5 * iqr)

flagged_outliers = feature_values[(feature_values < lower_bound) | (feature_values > upper_bound)]
print(f"IQR: {iqr:.2f} | Lower: {lower_bound:.2f} | Upper: {upper_bound:.2f}")
print("Detected Outliers:", flagged_outliers)`,
            practiceChallenge: "Write code to generate a 1x2 subplot grid where the left plot shows a histogram with KDE and the right plot displays a boxplot for a simulated dataset."
          }
        ]
      },
      {
        id: "c1-m5",
        title: "Module 5: Final Project: Automated Exploratory Data Analysis Toolkit",
        lessons: [
          {
            id: "c1-m5-l1",
            title: "Lesson 1: Building the Automated EDA Class Pipeline",
            duration: "30 mins",
            explanation: `In this capstone module, we assemble Python, NumPy, and Pandas into an object-oriented Automated EDA pipeline that digests any tabular dataset, produces descriptive statistics, flags high-cardinality columns, and exports a clean preprocessed matrix ready for Scikit-Learn training.`,
            keyTakeaways: [
              "Encapsulate data preparation logic inside reusable Python classes.",
              "Separate feature transformation (fit/transform) to eliminate data leakage.",
              "Include assertion tests to verify output matrix shapes and non-null states."
            ],
            pythonExample: `import pandas as pd
import numpy as np

class AutoDataInspector:
    def __init__(self, df: pd.DataFrame):
        self.df = df
        
    def generate_health_report(self) -> dict:
        total_rows = len(self.df)
        report = {
            'total_samples': total_rows,
            'total_features': self.df.shape[1],
            'missing_cells': int(self.df.isna().sum().sum()),
            'numeric_columns': list(self.df.select_dtypes(include=[np.number]).columns),
            'categorical_columns': list(self.df.select_dtypes(include=['object', 'category']).columns)
        }
        return report

# Test with a sample DataFrame
sample_df = pd.DataFrame({
    'age': [22, 38, np.nan, 45],
    'city': ['NYC', 'London', 'Paris', 'NYC'],
    'salary': [65000, 92000, 88000, np.nan]
})

inspector = AutoDataInspector(sample_df)
print("Pipeline Health Report:")
for k, v in inspector.generate_health_report().items():
    print(f"  {k}: {v}")`,
            practiceChallenge: "Extend AutoDataInspector with a method 'impute_numerical()' that replaces missing values in all numeric columns with each column's median."
          }
        ]
      }
    ]
  },
  "course-2": {
    modules: [
      {
        id: "c2-m1",
        title: "Module 1: Mathematical Foundations & Cost Function Minimization",
        lessons: [
          {
            id: "c2-m1-l1",
            title: "Lesson 1: Mean Squared Error & Convex Optimization",
            duration: "25 mins",
            explanation: `Supervised learning seeks parameter vector theta that minimizes empirical risk across training instances.\n\nFor Linear Regression, the Mean Squared Error (MSE) loss surface is a quadratic bowl (strictly convex), which guarantees that any local minimum is also the global minimum. We optimize theta using gradient descent: moving in the direction opposite to the gradient vector.`,
            keyTakeaways: [
              "Convex loss functions have a unique global optimum.",
              "Gradient points in the direction of steepest ascent; we step in -grad.",
              "Learning rate alpha governs convergence speed vs oscillation."
            ],
            pythonExample: `import numpy as np

# Implementing Gradient Descent for y = 2x + 1 from scratch
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1) * 0.2

# Initialize parameters theta0 (bias) and theta1 (slope)
theta = np.random.randn(2, 1)
X_b = np.c_[np.ones((100, 1)), X]  # add x0 = 1 bias column

learning_rate = 0.1
n_iterations = 200
m = len(X_b)

for iteration in range(n_iterations):
    gradients = (2/m) * X_b.T @ (X_b @ theta - y)
    theta = theta - learning_rate * gradients

print("Recovered Parameters (Expected ~ [4.0, 3.0]):")
print(f"Bias (theta_0):  {theta[0][0]:.4f}")
print(f"Slope (theta_1): {theta[1][0]:.4f}")`,
            practiceChallenge: "Modify the gradient descent loop to log the MSE loss value at each iteration and assert that loss decreases monotonically."
          }
        ]
      },
      {
        id: "c2-m2",
        title: "Module 2: Regression Models & Regularization (L1 / L2)",
        lessons: [
          {
            id: "c2-m2-l1",
            title: "Lesson 1: Ridge (L2) vs Lasso (L1) in Scikit-Learn",
            duration: "22 mins",
            explanation: `When features are correlated (multicollinearity) or feature count approaches sample size, Ordinary Least Squares estimates exhibit extreme variance.\n\nRidge (L2 penalty) constrains the Euclidean norm of weights, shrinking them smoothly. Lasso (L1 penalty) constrains the Manhattan norm, setting irrelevant feature weights to exact zeros.`,
            keyTakeaways: [
              "Ridge penalty: alpha * sum(w_j^2). Keeps all features, controls weight magnitudes.",
              "Lasso penalty: alpha * sum(|w_j|). Yields sparse models, acts as feature selection.",
              "Always scale features (e.g. StandardScaler) before applying L1/L2 regularization!"
            ],
            pythonExample: `from sklearn.linear_model import Ridge, Lasso, LinearRegression
from sklearn.preprocessing import StandardScaler
import numpy as np

# Generate correlated data
X = np.array([[1, 2, 3], [2, 4, 6], [3, 6, 9], [4, 8, 12]], dtype=float)
y = np.array([5, 10, 15, 20], dtype=float)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

ridge = Ridge(alpha=1.0).fit(X_scaled, y)
lasso = Lasso(alpha=0.5).fit(X_scaled, y)

print("Ridge Coefficients (shrinkage):", np.round(ridge.coef_, 4))
print("Lasso Coefficients (sparsity): ", np.round(lasso.coef_, 4))`,
            practiceChallenge: "Train both Ridge and Lasso models across alpha values [0.01, 0.1, 1.0, 10.0] and print how many zero coefficients Lasso produces at each alpha."
          }
        ]
      },
      {
        id: "c2-m3",
        title: "Module 3: Classification Algorithms & Boundary Analysis",
        lessons: [
          {
            id: "c2-m3-l1",
            title: "Lesson 1: Logistic Regression & Decision Boundaries",
            duration: "25 mins",
            explanation: `Logistic Regression maps continuous linear score z = w^T x + b through the Sigmoid function to output a calibrated probability between 0 and 1.\n\nDecision boundary is the geometric hypersurface where p = 0.5 (or z = 0).`,
            keyTakeaways: [
              "Sigmoid: sigma(z) = 1 / (1 + exp(-z)).",
              "Log-loss penalizes confident wrong predictions with asymptotic infinity.",
              "Threshold tuning (adjusting default 0.5) balances precision vs recall."
            ],
            pythonExample: `from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score
import numpy as np

# 2-feature toy classification
X = np.array([[1.2, 0.5], [1.8, 1.2], [0.8, 0.2], [4.5, 3.2], [5.1, 4.0], [4.8, 2.9]])
y = np.array([0, 0, 0, 1, 1, 1])

clf = LogisticRegression()
clf.fit(X, y)

test_sample = np.array([[2.5, 1.5]])
prob = clf.predict_proba(test_sample)[0]
print(f"Test Sample: {test_sample[0]}")
print(f"Prob(Class 0) = {prob[0]:.3f}, Prob(Class 1) = {prob[1]:.3f}")
print("Predicted Class:", clf.predict(test_sample)[0])`,
            practiceChallenge: "Write code to compute ROC-AUC score for a binary classifier on a synthetic validation split."
          }
        ]
      },
      {
        id: "c2-m4",
        title: "Module 4: Ensemble Learning with XGBoost and CatBoost",
        lessons: [
          {
            id: "c2-m4-l1",
            title: "Lesson 1: Gradient Boosting Trees & Residual Fitting",
            duration: "28 mins",
            explanation: `Ensemble methods combine multiple weak learners to build a high-performance predictor.\n\nRandom Forests use Bagging (Bootstrap Aggregating) to reduce variance. Gradient Boosted Decision Trees (XGBoost, LightGBM) use Boosting: sequentially training trees where each new tree fits the pseudo-residuals of the previous ensemble.`,
            keyTakeaways: [
              "Boosting reduces bias and variance sequentially.",
              "XGBoost adds second-order Taylor expansion gradients and tree complexity penalties.",
              "Early stopping prevents overfitting on validation data."
            ],
            pythonExample: `from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
import numpy as np

# Synthetic features
X_train = np.random.randn(100, 4)
y_train = (X_train[:, 0] + X_train[:, 1] > 0).astype(int)

# Train Gradient Boosting
gb = GradientBoostingClassifier(n_estimators=50, learning_rate=0.1, max_depth=3, random_state=42)
gb.fit(X_train, y_train)

# Feature importance ranking
importances = gb.feature_importances_
for i, imp in enumerate(importances):
    print(f"Feature {i} Importance: {imp:.4f}")`,
            practiceChallenge: "Compare the training and test accuracy of a Single Decision Tree vs a 100-tree Random Forest on a noisy classification problem."
          }
        ]
      },
      {
        id: "c2-m5",
        title: "Module 5: Model Evaluation, Validation Curves, & Cross-Validation Strategies",
        lessons: [
          {
            id: "c2-m5-l1",
            title: "Lesson 1: Stratified K-Fold & Confusion Matrix Diagnostics",
            duration: "24 mins",
            explanation: `A single train/test split can suffer from sample bias. Stratified K-Fold Cross Validation partitions data into K folds while preserving target class proportions in every fold.\n\nWe evaluate performance using confusion matrices, precision, recall, and F1-score to detect subtle class imbalance pitfalls.`,
            keyTakeaways: [
              "StratifiedKFold preserves label distribution across all folds.",
              "Avoid data leakage: Fit preprocessing steps exclusively inside each cross-validation fold using Pipeline.",
              "F1-score harmonic mean balances precision and recall."
            ],
            pythonExample: `from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.linear_model import LogisticRegression
import numpy as np

X = np.random.randn(120, 5)
y = np.array([0]*90 + [1]*30)  # Imbalanced: 75% class 0, 25% class 1

skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
model = LogisticRegression()

# Compute cross-validated F1 scores
f1_scores = cross_val_score(model, X, y, cv=skf, scoring='f1')

print("F1 Scores across 5 folds:", np.round(f1_scores, 4))
print(f"Mean F1: {f1_scores.mean():.4f} (+/- {f1_scores.std():.4f})")`,
            practiceChallenge: "Build a full scikit-learn Pipeline combining StandardScaler and LogisticRegression and evaluate it using 5-fold cross-validation."
          }
        ]
      }
    ]
  }
};

// Generic Fallback Lesson Generator to ensure ALL 6 courses and ALL 5 modules
// have rich, beginner-friendly, educational content with explanations and Python examples
export function getCourseCurriculum(course) {
  if (!course) return null;

  // Check if specialized lessons exist
  if (COURSE_LESSONS_MAP[course.id]) {
    return {
      courseId: course.id,
      courseTitle: course.title,
      category: course.category,
      modules: COURSE_LESSONS_MAP[course.id].modules
    };
  }

  // Auto-generate rich structured lessons for existing 5 course modules
  const generatedModules = course.modules.map((moduleTitle, mIdx) => {
    const moduleId = `${course.id}-m${mIdx + 1}`;
    
    return {
      id: moduleId,
      title: `Module ${mIdx + 1}: ${moduleTitle}`,
      lessons: [
        {
          id: `${moduleId}-l1`,
          title: `Lesson 1: Core Concepts & Architecture of ${moduleTitle.split(':')[0]}`,
          duration: "20 mins",
          explanation: `In this foundational lesson of "${moduleTitle}", we examine the theoretical principles and mathematical underpinnings required for ${course.category}.\n\nUnderstanding how this module interfaces with the broader machine learning workflow ensures you build robust, scalable architectures that avoid common data leakage and optimization bugs.`,
          keyTakeaways: [
            `Understand the primary objectives and constraints of ${moduleTitle.split(',')[0]}.`,
            "Learn best practices for data validation, dimensional consistency, and unit testing.",
            "Analyze computational complexity and latency trade-offs in production systems."
          ],
          pythonExample: `# Python implementation and demonstration for ${moduleTitle.split(':')[0]}
import numpy as np

def run_module_demo(param_alpha: float = 0.05) -> dict:
    """Demonstrates core logic for ${moduleTitle}."""
    print("Initializing execution pipeline for: ${moduleTitle}...")
    sample_data = np.linspace(0.1, 10.0, num=8)
    processed = np.log1p(sample_data) * (1.0 - param_alpha)
    
    metrics = {
        "status": "Success",
        "processed_samples": len(processed),
        "mean_value": float(np.mean(processed)),
        "std_variance": float(np.std(processed))
    }
    return metrics

results = run_module_demo(param_alpha=0.01)
print("Pipeline Output:", results)`,
          practiceChallenge: `Implement an automated unit test verifying that the output shape and non-negative constraints hold for ${moduleTitle.split(':')[0]}.`
        },
        {
          id: `${moduleId}-l2`,
          title: `Lesson 2: Hands-on Practical Implementation & Production Best Practices`,
          duration: "25 mins",
          explanation: `Taking "${moduleTitle}" from theory into code. Here we write clean, typed Python modules equipped with error handling, validation checks, and logging.\n\nIndustrial applications demand deterministic outputs, efficient memory management, and clear interfaces.`,
          keyTakeaways: [
            "Use type annotations and docstrings for maintainable ML software engineering.",
            "Profile execution bottlenecks and replace high-overhead loops with vectorized primitives.",
            "Write reproducible scripts with seed control for stochastic operations."
          ],
          pythonExample: `# Robust production pattern for ${course.title}
from typing import List, Dict, Any

class ModulePipelineService:
    def __init__(self, service_name: str = "${moduleTitle.split(',')[0]}"):
        self.service_name = service_name
        self.is_initialized = True
        
    def execute(self, payload: List[float]) -> Dict[str, Any]:
        if not payload:
            raise ValueError("Payload cannot be empty.")
            
        transformed = [x ** 2 for x in payload if x >= 0]
        return {
            "module": self.service_name,
            "input_count": len(payload),
            "valid_processed": len(transformed),
            "output_preview": transformed[:3]
        }

service = ModulePipelineService()
output = service.execute([1.5, 2.0, 3.5, 4.0])
print("Service Execution Result:", output)`,
          practiceChallenge: `Add custom exception handling to ModulePipelineService to gracefully handle invalid inputs or NaN values.`
        }
      ]
    };
  });

  return {
    courseId: course.id,
    courseTitle: course.title,
    category: course.category,
    modules: generatedModules
  };
}
