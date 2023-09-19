import styles from "./App.module.scss";
import {useForm} from "react-hook-form"

function App() {
  const {register, handleSubmit, getValues, formState:{errors},} = useForm({
    defaultValues:{
      name:"",
    },
    mode: "onChange",
  })

  function submit(values) {
    console.log(values);
  }
  return (
    <div className={`d-flex flex-column justify-content-center align-items-center ${styles.appContainer}`}>
      <form onSubmit={handleSubmit(submit)}>
      <div className="d-flex flex-column mb20">
          <label htmlFor="name">Name</label>
          <input
            {...register("name", {
              // disabled: true,
              minLength: {
                value: 3,
                message: "Le champ doit contenir au moins 3 caractères",
              },
              required: {
                value: true,
                message: "Ce champ doit être rempli",
              },
              validate(value) {
                if (value !== "bite") {
                  return true;
                } else {
                  return "Mot interdit";
                }
              },
            })}
            type="text"
            id="name"
          />
          {errors?.name && (
            <p style={{ color: "red" }}>{errors.name.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb20">
          <label htmlFor="age">Age</label>
          <input
            {...register("age", {
              valueAsNumber: true,
            })}
            type="number"
            id="age"
          />
          {errors?.name && (
            <p style={{ color: "red" }}>{errors.age.message}</p>
          )}
        </div>
      </form>
      <button className="btn btn-primary">Save</button>
    </div>
  )
}

export default App;
