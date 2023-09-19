import styles from "./App.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const yupSchema = yup.object({
    name:yup
    .string()
    .required("Ce champ est obligatoire"),
    age: yup
    .number()
    .required("Ce champ est obligatoire")
    .min(18),
    email: yup
    .string()
    .email("l'adresse email doit être valide")
    .required("Ce champ est obligatoire"),
    password: yup
    .string()
    .required()
    .min(5, "Le mot de passe doit faire au minimum 5 caractères"),
    confirmPassword: yup
    .string()
    .required("Confirmez votre mot de passe")
    .oneOf(
      [yup.ref("password", "")], "les mots de passe doivent correspondre"
    )


  });

  const defaultValues = {
    name: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    ingredients: "",
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

  const { fields, append, remove} = useFieldArray({
    name : "ingredients",
    control,
  })

  function addIngredient () {
    append({
        value: "",
    })
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
          <label htmlFor="email">Email</label>
          <input {...register("email")} type="email" id="email" />
          {errors?.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
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
          <label className="d-flex justify-content-center align-items-center" htmlFor="name">
            <span className="flex-fill mr10">Ingrédients</span>
          <button onClick={addIngredient}
          type="button" 
          className="btn btn-primary-reverse">+</button>
          </label>
        </div>
        <ul>
            {fields.map((ing, index) => (
                <li key={ing.id} className="mb10">
                    <input type="text" className="flex-fill mr10"/>
                    <button className="btn btn-primary">-</button>
                </li>
            ))}
        </ul>
        <button disabled={isSubmitting} className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default App;
