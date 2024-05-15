import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import RequireAuth from "./RequireAuth";
// staff pages
import StaffLayout from "./pages/layout/StaffLayout";
import NotifTable from "./pages/workspace/notifTable";
// symptom pages
import SymptomTable from "./pages/workspace/symptomTable";
import CreateSymptom from "./pages/symptom/createSymptom";
import EditSymptom from "./pages/symptom/editSymptom";
import ApproveSymptom from "./pages/symptom/approveSymptom";
import ViewSymptom from "./pages/symptom/viewSymptom";
// disease pages
import DiseaseTable from "./pages/workspace/diseaseTable";
import CreateDisease from "./pages/disease/createDisease";
import EditDisease from "./pages/disease/editDisease";
import ApproveDisease from "./pages/disease/approveDisease";
import ViewDisease from "./pages/disease/viewDisease";
// article pages
import ArticleTable from "./pages/workspace/articleTable";
import ArticleTableByDisease from "./pages/workspace/articleTableByDisease";
import CreateArticle from "./pages/article/createArticle";
import ApproveArticle from "./pages/article/approveArticle";
import ViewArticle from "./pages/article/viewArticle";
import EditArticle from "./pages/article/editArticle";
// appointment pages
import ApptTable from "./pages/workspace/apptTable";
import ViewAppt from "./pages/adminonly/viewAppt";
// blog pages
import CreateBlog from "./pages/blogs/createBlog";
import BlogTable from "./pages/workspace/blogTable";
import ViewBlog from "./pages/adminonly/viewBlog";
import EditBlog from "./pages/blogs/editBlog";
// user pages
import UserTable from "./pages/workspace/userTable";
import ViewUser from "./pages/adminonly/viewUser";
import EditUser from "./pages/adminonly/editUser";
// guest pages
import GuestLayout from "./pages/layout/GuestLayout";
import SymptomChecker from "./pages/guest/symptomChecker";
import Home from "./pages/guest/home";
import CreateAppt from "./pages/guest/createAppt";
import ArticlePatientView from "./pages/guest/articlePatientView";
import Work from "./pages/guest/workSchedule";
import SpecialtyPage from "./pages/guest/specialtyPage";
import SpecialtyDetail from "./components/SpecialtyDetail/SpecialtyDetail";
import ViewBlogList from "./pages/blogs/viewBlogList";
import ViewSpecificBlog from "./pages/blogs/viewSpecificBlog";

export default function Layouts({ userRole, userInfos }) {
  const [isLoading, setIsLoading] = useState(true);

  // Set time out
  useEffect(() => {
    const timeoutId = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && userRole && (
        <StaffLayout>
          {/* dashboard */}
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate to="/symptom-table" replace={true} />}
            />
            {/* notification page */}
            <Route
              path="/notif-table"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <NotifTable userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            {/* symptom pages */}
            <Route
              path="/symptom-table"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <SymptomTable userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/symptom/create"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["head-doctor"]}>
                  <CreateSymptom userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/symptom/:symptomId/edit"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "admin"]}
                >
                  <EditSymptom userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/symptom-temp/:symptomIdTemp/approve"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["admin", "head-doctor"]}
                >
                  <ApproveSymptom userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/symptom/:symptomId/view"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <ViewSymptom userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            {/* disease pages */}
            <Route
              path="/disease-table"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <DiseaseTable userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/create"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["head-doctor"]}>
                  <CreateDisease userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/:diseaseId/edit"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["head-doctor"]}>
                  <EditDisease userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease-temp/:diseaseIdTemp/approve"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "admin"]}
                >
                  <ApproveDisease userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/:diseaseId/view"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <ViewDisease userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            {/* article pages */}
            <Route
              path="article-table"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <ArticleTable userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="disease/:diseaseId/article-table"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <ArticleTableByDisease
                    userRole={userRole}
                    userInfos={userInfos}
                  />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/:diseaseId/article/create"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor"]}
                >
                  <CreateArticle userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/:diseaseId/article/:articleId/edit"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor"]}
                >
                  <EditArticle userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="article-temp/:articleIdTemp/approve"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor"]}
                >
                  <ApproveArticle userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/:diseaseId/article/:articleId/view"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <ViewArticle userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            {/* appointment pages */}
            <Route
              path="/appointment-table"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["admin"]}>
                  <ApptTable userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/appointment/:apptId/view"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["admin"]}>
                  <ViewAppt userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            {/* blog pages */}
            <Route
              path="/create-blog"
              element={<CreateBlog userInfos={userInfos} />}
            />
            <Route
              path="/blog-table"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["admin", "head-doctor", "doctor"]}
                >
                  <BlogTable userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/blog/:blogId/view"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["admin", "head-doctor", "doctor"]}
                >
                  <ViewBlog userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/blog/:blogId/edit"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor"]}
                >
                  <EditBlog userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            {/* user pages */}
            <Route
              path="/user-table"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["admin"]}>
                  <UserTable userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/user/:userId/view"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["admin"]}>
                  <ViewUser userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/user/:userId/edit"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["admin"]}>
                  <EditUser userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
          </Routes>
        </StaffLayout>
      )}
      {!isLoading && !userRole && (
        <GuestLayout>
          <Routes>
            {/* guest pages */}
            <Route path="/home" element={<Home />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route
              path="/articles/:articleId"
              element={<ArticlePatientView />}
            />
            <Route
              exact
              path="/"
              element={<Navigate to="/home" replace={true} />}
            />
            <Route path="/appt-request" element={<CreateAppt />} />
            <Route path="/specialty-page" element={<SpecialtyPage />} />
            <Route
              path="/specialty-page/:specialtyId"
              element={<SpecialtyDetail />}
            />
            <Route path="/work-schedule" element={<Work />} />
            <Route path="/view-blog-list" element={<ViewBlogList />} />
            <Route path="/view-blog-list/:id" element={<ViewSpecificBlog />} />
          </Routes>
        </GuestLayout>
      )}
    </div>
  );
}
