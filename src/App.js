import styles from "./App.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const yupSchema = yup.object({});

  const defaultValues = {
    name: "",
    age: "",
    password: "",
    confirmPassword: "",
    ingredients: [],
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  function addIngredient() {
    append({
      value: "",
    });
  }

  function deleteIngredient(id) {
    remove(id)
  }

  function submit(values) {
    console.log(values);

    // en cas de réussite
    // reset(defaultValues)
  }
  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center ${styles.appContainer}`}
    >
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb20">
          <label htmlFor="name">Name</label>
          <input {...register("name")} type="text" id="name" />
          {errors?.name && (
            <p style={{ color: "red" }}>{errors.name.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb20">
          <label htmlFor="age">Age</label>
          <input {...register("age")} type="number" id="age" />
          {errors?.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
        </div>
        <div className="d-flex flex-column mb20">
          <label htmlFor="password">Password</label>
          <input {...register("password")} type="password" id="password" />
          {errors?.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb20">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
          />
          {errors?.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb20">
          <label
            htmlFor="name"
            className="d-flex justify-content-center align-items-center mb10"
          >
            <span className="flex-fill mr10">Ingrédients</span>
            <button
              onClick={addIngredient}
              type="button"
              className="btn btn-primary-reverse"
            >
              +
            </button>
          </label>
          <ul>
            {fields.map((ing, index) => (
              <li key={ing.id} className="mb10">
                <input
                  {...register(`ingredients[${index}].value`)}
                  type="text"
                  className="flex-fill mr10"
                />
                <button onClick={() => deleteIngredient(index)} 
                className="btn btn-primary"
                type="button">-</button>
              </li>
            ))}
          </ul>
        </div>
        <button disabled={isSubmitting} className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default App;