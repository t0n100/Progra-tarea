import React from "react";
import PropTypes from "prop-types";
import styles from "./home.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import axios from "axios";
import User from "../User/User";
import Note from "../Note/Note";

const Home = () => {
  //constante
  const [data, setData] = React.useState(
    "Tarea de insertar notas en la base de datos "
  );
  const [formValues, setFormValues] = React.useState();
  const [authenticated, setAuthenticated] = React.useState();
  const [users, setUsers] = React.useState();
  const [notes, setNotes] = React.useState();

  const urlDelApi = "http://localhost/dashboard/apiDB.php/records";

  const mockUser = {
    usuario: "admin",
    password: "admin",
  };

  const mockUsers = [
    {
      UserID: 1,
      Username: "user1",
      Password: "password1",
      Email: "user1@example.com",
      CreatedAt: "2023-10-10 15:56:41",
    },
    {
      UserID: 2,
      Username: "user2",
      Password: "password2",
      Email: "user2@example.com",
      CreatedAt: "2023-10-10 15:56:41",
    },
  ];

  const mockNotes = [
    {
      NoteID: 1,
      UserID: 1,
      Title: "ToDo 1",
      Content: "This is the content of ToDo 1 for user 1.",
      CreatedAt: "2023-10-10 15:56:41",
    },
    {
      NoteID: 2,
      UserID: 1,
      Title: "ToDo 2",
      Content: "This is the content of ToDo 2 for user 1.",
      CreatedAt: "2023-10-10 15:56:41",
    },
    {
      NoteID: 3,
      UserID: 2,
      Title: "Task 1",
      Content: "This is the content of Task 1 for user 2.",
      CreatedAt: "2023-10-10 15:56:41",
    },
  ];

  let nombre = "Sergio";

  // ES6

  const onClickBtn = () => {
    console.log("click", formValues);
    let nombre = "Sergio";

    if (
      mockUser.usuario === formValues.usuario &&
      mockUser.password === formValues.password
    ) {
      console.log("Usuario correcto");
    } else {
      console.log("Usuario incorrecto");
    }
  };

  const onChancheInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    console.log(event);
    console.log(name);
    console.log(value);

    setFormValues({ ...formValues, [name]: value });
  };

  const callAPINotes = (event) => {
    axios
      .get(`${urlDelApi}/notes`) //cambio direccion
      .then(function (response) {
        // handle success
        console.log(response);
        console.log(response.data.records);
        console.log(response.statusText);
        setNotes(response.data.records);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  const callAPMockNotes = (event) => {
    setNotes(mockNotes);
  };
  const clearNotes = (event) => {
    setNotes();
  };

  const callAPIAuthenticate = (event) => {
    const data = formValues;

    // ("/records/categories?filter=id,gt,1&filter=id,lt,3");
    console.log("data");
    axios
      .get(
        `${urlDelApi}/Users?filter=Username,eq,${formValues.usuario}&filter=Password,eq,${formValues.password}`
      )
      .then(function (response) {
        // handle success
        console.log("data", response.data.records);
        setUsers(response.data.records);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };


/* tarea de insertar en el api */
    const [formData, setFormData] = useState({
      UserID: '',
      Title: '',
      Content: ''
    });
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };


    const handleReset = () => {
      setFormData({
        UserID: '',
        Title: '',
        Content: ''
      });
    };

    const insertNoteToDB2 = () => {
      axios
      .post(`${urlDelApi}/notes`, formData)
      .then(function (response) {
       
        handleReset();
      })
        .then(function (response) {
          
          callAPINotes();
        })
        .catch(function (error) {
          
          console.log(error);
        })
        .finally(function () {
          
        });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      insertNoteToDB2(formData);
    };


    /*codigo local para bd*/
  const insertNoteToDB = () => {
    axios
      .post(`${urlDelApi}/notes`, {
        UserID: 3,
        Title: "Task 1",
        Content: "nota quemada insertada desde vs code.",
      })
      .then(function (response) {
        // handle success
        callAPINotes();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  return (
    <div className={styles.Home}>
      <h1>{data}</h1>
      <Grid
        container
        spacing={2}
        style={{
          inset: 0,
          margin: "auto",
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
      
       
        <Grid item xs={6}>
          <h2>insertar en el API y base de datos</h2>
          <p>
            {" "}
            
          </p> 
        

        
          <Grid item xs={3} style={{}}>
          <form onSubmit={handleSubmit}>
        <TextField
             type="text"
             name="UserID"
            required
            label="UserID"
            onChange={handleChange}
            variant="standard"
          />
        <br />

<TextField
            type="text"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            label="Titulo"
            variant="standard"
          />
<br />

<TextField
           name="Content"
           value={formData.Content}
           onChange={handleChange}
            label="informacion "
            variant="outlined"
            
          />
<br /><br />
<Button  type="submit" variant="contained"color="success" sx={{ mx: 2 }}>
            Insertar
          </Button>
          </form>
          </Grid>

          <Button onClick={callAPINotes} variant="contained" sx={{ mx: 3 }}>
            Llamar API
          </Button>
          <br></br><br></br>
          <Button onClick={clearNotes} color="secondary" variant="text">
            Limpiar
          </Button>
        </Grid>
        <Grid item xs={6} style={{}}>
          <h2>Llamar Local y base de datos</h2>
          <p>
            {" "}
           El boton llama a MockNotes 
          </p>
          <Button onClick={callAPMockNotes} variant="contained" sx={{ mx: 2 }}>
            Llamar Local
          </Button>

          <Button onClick={insertNoteToDB} variant="contained" sx={{ mx: 2 }}>
            Insertar nota
          </Button>
          <Button onClick={clearNotes} color="secondary" variant="text">
            Limpiar
          </Button>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <p>
            
          </p>
        </Grid>
      </Grid>

      <Card id="card-home" className={styles["card-home"]}>
        {console.log("por aca ando")}

        <Grid container spacing={2}>
          {notes?.map((nota, index) => {
            return (
              <Grid item xs={4}>
                {" "}
                <Note titulo="titulo" note={nota}></Note>
              </Grid>
            );
          })}
        </Grid>
      </Card>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
