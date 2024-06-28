import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Link,
  Breadcrumbs,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Badge,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { DataGrid } from "@mui/x-data-grid";

import history from "../history";

function handleClick(event) {
  event.preventDefault();

  if (Boolean(event.target.href)) {
    const path = event.target.href.split("/")[3];
    history.push(`/${path}`);
  }
}

const Clientes = () => {
  const cols = [
    {
      field: "id",
      headerName: "ID",
      width: 120,
    },
    {
      field: "razonSocial",
      headerName: "Razón Social",
      width: 300,
    },
    {
      field: "rut",
      headerName: "RUT",
      width: 120,
    },
    {
      field: "direccion",
      headerName: "Dirección",
      width: 200,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 120,
    },
    {
      field: "apellido",
      headerName: "Apellido",
      width: 120,
    },
    {
      field: "telefono",
      headerName: "Teléfono",
      width: 120,
    },
  ];
  const [clientes, setClientes] = useState([]);
  const [infoCliente, setInfoCliente] = useState({
    id: Math.floor(Math.random() * 100) + 1,
    razonSocial: "",
    rut: "",
    direccion: "",
    nombre: "",
    apellido: "",
    telefono: "",
  });

  useEffect(() => {
    handleFetchClientes();
  }, []);

  const handleSaveCliente = () => {
    axios
      .post("http://localhost:5075/Cliente/nuevo", infoCliente)
      .then(({ data }) => {
        alert("¡Cliente registrado!");
        handleFetchClientes();
        setInfoCliente({
          id: Math.floor(Math.random() * 100) + 1,
          razonSocial: "",
          rut: "",
          direccion: "",
          nombre: "",
          apellido: "",
          telefono: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFetchClientes = () => {
    axios
      .get("http://localhost:5075/Cliente/listar")
      .then(({ data }) => {
        setClientes(data);
      })
      .catch((error) => {
        setClientes([]);
      });
  };

  const handleEditInfo = (e, field) => {
    setInfoCliente((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Grid2 container justifyContent="center" sx={{ p: 10 }} spacing={3}>
      <Grid2 md={12} xs={12}>
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Productos
            </Link>
            <Link underline="hover" color="inherit" href="/ventas">
              Ventas
            </Link>
            <Link underline="hover" color="inherit" href="/despachos">
              Despachos
            </Link>
            <Link underline="hover" color="inherit" href="/clientes">
              Clientes
            </Link>
          </Breadcrumbs>
        </div>
      </Grid2>
      <Grid2 md={12} xs={12}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid2 container spacing={3} justifyContent="center">
            <Grid2 md={12} xs={12}>
              <Typography variant="h3" component="div">
                Clientes - FERREMAX
              </Typography>
            </Grid2>
            <Divider />

            {!clientes.length ? (
              <>
                <Grid2 md={1} xs={1}>
                  <LocalShippingIcon
                    sx={{ fontSize: 80, textAlign: "center", color: "red" }}
                  />
                </Grid2>
                <Grid2 md={12} xs={12} sx={{ textAlign: "center" }}>
                  <Typography variant="button">
                    No hay clientes registrados
                  </Typography>
                </Grid2>
              </>
            ) : (
              <Grid2 md={12} xs={12} sx={{ height: 500 }}>
                <DataGrid rows={clientes} columns={cols} />
              </Grid2>
            )}
          </Grid2>
          <Divider />
          <Grid2 container spacing={3} sx={{ pt: 4 }}>
            <Grid2 md={12} xs={12}>
              <Typography variant="h3" component="div">
                Nuevo Cliente
              </Typography>
            </Grid2>
            <Grid2 md={3} xs={12} sx={{ pt: 2 }}>
              <TextField
                value={infoCliente["razonSocial"]}
                id="razonSocial"
                label="Razón Social"
                variant="outlined"
                fullWidth
                onChange={(e) => handleEditInfo(e, "razonSocial")}
              />
            </Grid2>
            <Grid2 md={3} xs={12} sx={{ pt: 2 }}>
              <TextField
                value={infoCliente["rut"]}
                id="rut"
                label="RUT"
                variant="outlined"
                fullWidth
                onChange={(e) => handleEditInfo(e, "rut")}
              />
            </Grid2>
            <Grid2 md={3} xs={12} sx={{ pt: 2 }}>
              <TextField
                value={infoCliente["direccion"]}
                id="direccion"
                label="Dirección"
                variant="outlined"
                fullWidth
                onChange={(e) => handleEditInfo(e, "direccion")}
              />
            </Grid2>
            <Grid2 md={3} xs={12} sx={{ pt: 2 }}>
              <TextField
                value={infoCliente["nombre"]}
                id="nombre"
                label="Nombre"
                variant="outlined"
                fullWidth
                onChange={(e) => handleEditInfo(e, "nombre")}
              />
            </Grid2>
            <Grid2 md={3} xs={12} sx={{ pt: 2 }}>
              <TextField
                value={infoCliente["apellido"]}
                id="apellido"
                label="Apellido"
                variant="outlined"
                fullWidth
                onChange={(e) => handleEditInfo(e, "apellido")}
              />
            </Grid2>
            <Grid2 md={3} xs={12} sx={{ pt: 2 }}>
              <TextField
                value={infoCliente["telefono"]}
                id="telefono"
                label="Teléfono"
                variant="outlined"
                fullWidth
                onChange={(e) => handleEditInfo(e, "telefono")}
              />
            </Grid2>
            <Grid2 md={3} xs={12} sx={{ pt: 2 }}>
              <Button
                onClick={handleSaveCliente}
                variant="contained"
                fullWidth
                sx={{ height: "100%" }}
              >
                Registrar Cliente
              </Button>
            </Grid2>
          </Grid2>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default Clientes;
