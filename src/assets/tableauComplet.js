import styles from "./App.module.scss";
import { useForm } from "react-hook-form";
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
    gender: "man",
    newsletter: true,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

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
          <label htmlFor="gender" className="mb10">
            Gender
          </label>
          <div>
            <label htmlFor="man">Homme</label>
            <input {...register("gender")} type="radio" id="man" value="man" />
          </div>
          <div>
            <label htmlFor="woman">Femme</label>
            <input
              {...register("gender")}
              type="radio"
              id="woman"
              value="woman"
            />
          </div>
        </div>
        <div className="d-flex flex-column mb20">
          <label className="mb10" htmlFor="newsletter">
            Newsletter
            <input
              {...register("newsletter")}
              type="checkbox"
              id="newsletter"
            />
          </label>
        </div>
        <div className="d-flex flex-column mb20">
          <label className="mb10" htmlFor="techno">
            Votre techno préférée
          </label>
          <select id="techno" {...register("techno")}>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="react">React</option>
            <option value="node">Node</option>
            <option value="sql">SQL</option>
          </select>
        </div>
        <button disabled={isSubmitting} className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default App;
