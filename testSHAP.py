import shap
from sklearn import svm
import matplotlib.pyplot as plt
# train XGBoost model
X,y = shap.datasets.adult()
print(X)
print(y)
model = svm.SVC(kernel='linear').fit(X[0:100], y[0:100])

# compute SHAP values
explainer = shap.Explainer(model, X[0:100])
shap_values = explainer(X[0:100])
print(shap_values[0])
shap.plots.heatmap(shap_values,show=False)
plt.title("test")
plt.savefig("test.png")
