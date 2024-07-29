"use client";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import {
  //   updateProject,
  getAllProjectManagers,
  updateProjectById,
} from "../project/(services)/project.service";
import { ComboBoxField, FormikInputField } from "./CreatProjectForm";
import { errorToast, successToast } from "../utils/Toaster";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../(slice)/LoaderSlice";

export const projectValidationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  managerEmail: yup.string().required("Manager is required"),
  status: yup.string(),
  dueDate: yup
    .date()
    .required("Due date is required")
    .min(new Date(), "Due date should be greater than today"),
  budget: yup.number().min(1, "Budget should be greater than 0"),
  progress: yup.number().min(1, "Progress should be greater than 0"),
});

export const EditProjectForm = ({
  setIsEditProjectModalOpen,
  projectData,
}: {
  setIsEditProjectModalOpen: CallableFunction;
  projectData: {
    id: string;
    title: string;
    description: string;
    managerName: string;
    managerEmail: string;
    status: string;
    dueDate: Date;
    progress: number;
    budget: number;
  };
}) => {
  const [managers, setManagers] = useState<{ name: string; email: string }[]>(
    []
  );
  const dispatch = useDispatch();
  function formatDate(dateString: any) {
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    const getAllManagers = async () => {
      const data = await getAllProjectManagers();
      return data.managers;
    };

    getAllManagers()
      .then((resp) => {
        console.log("managers", resp);
        setManagers(resp);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="p-8 flex flex-col items-center ">
      <h1 className="text-center text-2xl font-semibold mb-8">Edit Project</h1>
      <Formik
        enableReinitialize
        initialValues={{
          title: projectData.title || "",
          description: projectData.description || "",
          managerEmail: projectData.managerEmail || "",
          status: projectData.status || "",
          dueDate: formatDate(projectData.dueDate) || "",
          progress: projectData.progress || 0,
          budget: projectData.budget || 0,
        }}
        onSubmit={async (values) => {
          dispatch(startLoading());
          await new Promise((res) => setTimeout(res, 2000));
          updateProjectById(projectData.id, values)
            .then((rsp) => {
              console.log(rsp);
              setIsEditProjectModalOpen(false);
              successToast("Project Updated Successfully");
            })
            .catch((err) => {
              console.log(err);
              errorToast("Error Updating Project");
            })
            .finally(() => dispatch(stopLoading()));
        }}
        validationSchema={projectValidationSchema}
      >
        {(formikProps) => {
          return (
            <Form className="w-full ">
              <div className="flex flex-col gap-y-6 py-4">
                <FormikInputField
                  formikProps={formikProps}
                  name="title"
                  placeholder="Title"
                />
                <FormikInputField
                  formikProps={formikProps}
                  type="text"
                  name="description"
                  placeholder="Description"
                />
                <ComboBoxField
                  formikProps={formikProps}
                  targetField="managerEmail"
                  placeholder="Manager"
                  items={managers?.map(
                    (manager) =>
                      ({ id: manager.email, title: manager.name } ?? [])
                  )}
                />
                <ComboBoxField
                  formikProps={formikProps}
                  targetField="status"
                  placeholder="Status"
                  items={[
                    { id: "ONGOING", title: "On going" },
                    { id: "ATRISK", title: "At risk" },
                    { id: "DELAYED", title: "Delayed" },
                    { id: "COMPLETED", title: "Completed" },
                  ]}
                />
                <FormikInputField
                  formikProps={formikProps}
                  type="date"
                  name="dueDate"
                  placeholder="Due Date"
                />
                <FormikInputField
                  formikProps={formikProps}
                  type="number"
                  name="budget"
                  placeholder="Estimated Budget"
                />
                <FormikInputField
                  formikProps={formikProps}
                  type="number"
                  name="progress"
                  placeholder="Progress"
                />
              </div>
              <div className="flex gap-x-4 mt-8">
                <button
                  type="submit"
                  className="grow bg-orange-500 text-white px-4 py-2 rounded-lg"
                >
                  Update
                </button>
                <button
                  className="grow bg-slate-800 text-white px-4 py-2 rounded-lg"
                  type="button"
                  onClick={() => setIsEditProjectModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
