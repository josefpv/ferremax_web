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

const Despachos = () => {
  const cols = [
    {
      field: "id",
      headerName: "ID",
      width: 120,
    },
    {
      field: "id_venta",
      headerName: "ID Venta",
      width: 80,
    },
    {
      field: "id_despachador",
      headerName: "ID Despachador",
      width: 330,
    },
    {
      field: "id_ruta",
      headerName: "ID Ruta",
      width: 330,
    },
    {
      field: "despachado",
      headerName: "¿Despacho Finalizado?",
      width: 200,
      renderCell: ({ row }) => {
        if (Boolean(row.despachado)) {
          return <LocalShippingIcon sx={{ color: "green" }} />;
        }
        return <LocalShippingIcon sx={{ color: "red" }} />;
      },
    },
    {
      field: "",
      headerName: "Finalizar",
      width: 220,
      renderCell: ({ row }) => (
        <Button
          disabled={Boolean(row.despachado)}
          variant="contained"
          color="primary"
          startIcon={<CheckIcon />}
          onClick={() => actualizaDespacho(row.id)}
        >
          Finalizar despacho
        </Button>
      ),
    },
  ];
  const [despachos, setDespachos] = useState([]);

  useEffect(() => {
    handleFetchDespachos();
  }, []);

  const handleFetchDespachos = () => {
    axios
      .get("https://ferremaxapi.azurewebsites.net/api/v1/despachos")
      .then(({ data }) => {
        setDespachos(data);
      })
      .catch((error) => {
        setDespachos([]);
      });
  };

  const actualizaDespacho = (id) => {
    axios
      .put(`https://ferremaxapi.azurewebsites.net/api/v1/despachos/${id}`)
      .then(({ data }) => {
        alert("¡Despacho finalizado!");
        handleFetchDespachos();
      })
      .catch((error) => {
        console.log(error);
      });
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
          </Breadcrumbs>
        </div>
      </Grid2>
      <Grid2 md={12} xs={12}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid2 container spacing={3} justifyContent="center">
            <Grid2 md={12} xs={12}>
              <Typography variant="h3" component="div">
                Logística/Despachos - FERREMAX
              </Typography>
            </Grid2>
            <Divider />

            {!despachos.length ? (
              <>
                <Grid2 md={1} xs={1}>
                  <LocalShippingIcon
                    sx={{ fontSize: 80, textAlign: "center", color: "red" }}
                  />
                </Grid2>
                <Grid2 md={12} xs={12} sx={{ textAlign: "center" }}>
                  <Typography variant="button">No hay despachos aún</Typography>
                </Grid2>
              </>
            ) : (
              <Grid2 md={12} xs={12} sx={{ height: 500 }}>
                <DataGrid rows={despachos} columns={cols} />
              </Grid2>
            )}
          </Grid2>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default Despachos;
