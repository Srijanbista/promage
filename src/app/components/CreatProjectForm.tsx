import { Combobox, Transition } from "@headlessui/react";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { Fragment, HTMLProps, useState } from "react";
import * as yup from "yup";

const projectValidationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  manager: yup.string().required("Manager is required"),
  status: yup.string(),
  dueDate: yup.date().required("Due date is required"),
  progress: yup.number(),
});

const CreatProjectForm = ({
  setIsCreateProjectModalOpen,
}: {
  setIsCreateProjectModalOpen: CallableFunction;
}) => {
  const calculateDueDate = () => {
    const currentDate = new Date();
    return new Date(currentDate.setDate(currentDate.getDate() + 90));
  };

  return (
    <div className="p-8 flex flex-col items-center ">
      <h1 className="text-center text-2xl font-semibold mb-8">
        Create Project
      </h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          manager: "Manager1",
          status: "ONGOING",
          dueDate: calculateDueDate(),
          progress: 0,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={projectValidationSchema}
      >
        {(formikProps) => {
          return (
            <Form className="w-full ">
              <div className="flex flex-col gap-y-6 max-h-96 py-4">
                <FormikInputField
                  formikProps={formikProps}
                  name="title"
                  placeholder="Title"
                />
                <FormikInputField
                  formikProps={formikProps}
                  type="textarea"
                  name="description"
                  placeholder="Description"
                />
                <ComboBoxField
                  formikProps={formikProps}
                  targetField="manager"
                  placeholder="Manager"
                  items={[
                    { id: "Manager1", title: "Manager1" },
                    { id: "ATRISK", title: "Manager2" },
                    { id: "DELAYED", title: "Manager3" },
                    { id: "COMPLETED", title: "Manager4" },
                  ]}
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
              </div>
              <div className="flex gap-x-4 mt-8">
                <button
                  type="submit"
                  className="grow bg-orange-500 text-white px-4 py-2 rounded-lg"
                >
                  Create
                </button>
                <button
                  className="grow bg-slate-800 text-white px-4 py-2 rounded-lg"
                  type="button"
                  onClick={() => setIsCreateProjectModalOpen(false)}
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

export default CreatProjectForm;

export const FormikInputField = ({
  formikProps,
  name,
  placeholder,
  isDisabled = false,
  type = "text",
  className,
}: {
  formikProps: FormikProps<any>;
  name: string;
  placeholder: string;
  isDisabled?: boolean;
  type?: string;
  className?: HTMLProps<HTMLElement>["className"];
}) => {
  let randomId = crypto.randomUUID();
  return (
    <div className={className}>
      <div className="relative">
        <Field
          type={type}
          as={type == "textarea" ? type : "input"}
          rows="2"
          name={name}
          disabled={isDisabled}
          placeholder=""
          id={`${randomId}-${placeholder}`}
          className="w-full px-2 peer rounded-md py-2 border border-neutral-300 focus-visible:outline-none focus-visible:border-primary-700"
          onBlur={(e: any) => {
            e.target.value = e.target.value.trim();
            formikProps?.setFieldValue(name, e.target.value.trim());
          }}
        />
        <label
          htmlFor={`${randomId}-${placeholder}`}
          className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary-700 peer-focus:dark:text-primary-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          {placeholder}
        </label>
      </div>
      <ErrorMessage name={name}>
        {(msg) => <span className="text-sm text-red-500">{msg}</span>}
      </ErrorMessage>
    </div>
  );
};

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

export const ComboBoxField = ({
  formikProps,
  targetField,
  placeholder,
  items,
  isDisabled = false,
  triggerCallback,
}: {
  formikProps: any;
  targetField: string;
  placeholder: string;
  items: { id: string; title: string }[];
  isDisabled?: boolean;
  triggerCallback?: CallableFunction;
}) => {
  const [query, setQuery] = useState("");
  const filteredItems =
    query === ""
      ? items
      : items.filter((item) =>
          item.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const returnItemTitle = (id: string) => {
    return items.filter((item) => item.id == id)?.[0]?.title;
  };
  const { errors, setFieldValue } = formikProps;
  return (
    <Combobox
      disabled={isDisabled}
      value={formikProps.values[targetField]}
      onChange={(value: any) => {
        setFieldValue(targetField, value.id);
        if (typeof triggerCallback === "function") {
          triggerCallback(value.id);
        }
      }}
    >
      <div className="relative">
        <div
          className={`relative w-full cursor-default text-left sm:text-sm border rounded-md border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-700 focus:outline-none focus:ring-0 focus:border-primary-700 peer ${
            isDisabled && "bg-neutral-50"
          }`}
        >
          <Combobox.Button className="w-full inset-y-0 right-0 flex items-center pr-2 peer-focus:text-red-700">
            <Combobox.Input
              className={`bg-transparent block peer px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 focus:outline-none`}
              displayValue={(id: string) => {
                return returnItemTitle(id);
              }}
              onChange={(event) => setQuery(event.target.value)}
              placeholder=""
            />
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400 "
              aria-hidden="true"
            />
            <label className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary-700 peer-focus:dark:text-primary-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              {placeholder}
            </label>
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute z-40 mt-1 mb-2 max-h-60 w-full overflow-auto scrollbar-track-primary-200 scrollbar-thin scrollbar-track-rounded scrollbar-thumb-primary-700 scrollbar-thumb-rounded-lg rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredItems.map((item) => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-orange-500 text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.title}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
        {formikProps.touched[targetField] && (
          <label className="label">
            <span className="text-sm text-red-500">
              {errors[targetField] ?? ""}
            </span>
          </label>
        )}
      </div>
    </Combobox>
  );
};
