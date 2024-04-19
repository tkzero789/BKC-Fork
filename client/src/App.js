import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/styles.css";
import "./css/responsive.css";
import "./css/base.css";
import CreateSymptom from "./pages/createSymptom";
import NewSymptom from "./pages/newSymptom";
import EditSymptom from "./pages/editSymptom";
import SymptomChecker from "./pages/symptomChecker";
import Signup from "./pages/signup";
import SignupDoctor from "./pages/signupDoctor";
import Signin from "./pages/signin";
import Home from "./pages/home";
import TestHome from "./pages/testHome";
import ScrollToTop from "./components/Functionals/ScrollToTop";
import ApptRequest from "./pages/apptRequest";
import { useAuth } from "./AuthContext";
import RequireAuth from "./RequireAuth";
import ArticlePatientView from "./pages/articlePatientView";
import TestSignin from "./pages/testSignin";
import CreateDisease from "./pages/createDisease";
import DiseaseList from "./pages/diseaseList";
import EditDisease from "./pages/editDisease";
import ArticlesByDisease from "./pages/articlesByDisease";
import CreateArticle from "./pages/createArticle";
import ViewDisease from "./pages/viewDisease";
import ViewArticle from "./pages/viewArticle";
import EditArticle from "./pages/editArticle";
import AdminHome from "./pages/home/AdminHome";
import Login from "./pages/login/Login";
import DoctorList from "./pages/list/DoctorList";
import ArticleList from "./pages/list/ArticleList";

import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";

const App = () => {
  const { getUserRole, getUserInfos } = useAuth();
  return (
    <div style={{ overflow: "hidden" }}>
      <ScrollToTop />
      <Routes>
        <Route
          exact
          path="/"
          element={<Navigate to="/home" replace={true} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/test-home" element={<TestHome />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users">
          <Route index element={<DoctorList />} />
          <Route path=":userId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Add New User" />}
          />
        </Route>
        <Route path="/article-doctor">
          <Route index element={<ArticleList />} />
          <Route path=":article-doctorID" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={productInputs} title="Add New Product" />}
          />
        </Route>
        <Route path="/appt-request" element={<ApptRequest />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-doctor" element={<SignupDoctor />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/test-signin" element={<TestSignin />} />
        <Route
          path="/articles/:articleId"
          element={<ArticlePatientView userInfos={getUserInfos()} />}
        />
        <Route
          path="/create-symptom"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["head-doctor", "admin"]}
            >
              <CreateSymptom />
            </RequireAuth>
          }
        />
        <Route
          path="/new-symptom"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["head-doctor", "admin"]}
            >
              <NewSymptom />
            </RequireAuth>
          }
        />
        <Route
          path="/edit-symptom/:id"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["head-doctor", "admin"]}
            >
              <EditSymptom />
            </RequireAuth>
          }
        />
        <Route
          path="/disease-list"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["head-doctor", "doctor", "admin"]}
            >
              <DiseaseList userInfos={getUserInfos()} />
            </RequireAuth>
          }
        />
        <Route
          path="/disease/:diseaseId/view"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["head-doctor", "doctor", "admin"]}
            >
              <ViewDisease userInfos={getUserInfos()} />
            </RequireAuth>
          }
        />
        <Route
          path="/disease/:diseaseId/edit"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["head-doctor", "admin"]}
            >
              <EditDisease userInfos={getUserInfos()} />
            </RequireAuth>
          }
        />
        <Route
          path="/disease/create"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["head-doctor", "admin"]}
            >
              <CreateDisease userInfos={getUserInfos()} />
            </RequireAuth>
          }
        />
        <Route
          path="/disease/:diseaseId/article-list"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["head-doctor", "doctor", "admin"]}
            >
              <ArticlesByDisease userInfos={getUserInfos()} />
            </RequireAuth>
          }
        />
        <Route
          path="/disease/:diseaseId/article/:articleId/view"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["head-doctor", "doctor", "admin"]}
            >
              <ViewArticle userInfos={getUserInfos()} />
            </RequireAuth>
          }
        />
        <Route
          path="/disease/:diseaseId/article/:articleId/edit"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["head-doctor", "doctor", "admin"]}
            >
              <EditArticle userInfos={getUserInfos()} />
            </RequireAuth>
          }
        />
        <Route
          path="/disease/:diseaseId/article/create"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["head-doctor", "doctor", "admin"]}
            >
              <CreateArticle userInfos={getUserInfos()} />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
