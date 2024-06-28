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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import { DataGrid } from "@mui/x-data-grid";

import history from "../history";

function handleClick(event) {
  event.preventDefault();

  if (Boolean(event.target.href)) {
    const path = event.target.href.split("/")[3];
    history.push(`/${path}`);
  }
}

const Ventas = () => {
  const cols = [
    {
      field: "id",
      headerName: "ID Venta",
      width: 120,
    },
    {
      field: "RazonSocial",
      headerName: "Razon Social",
      width: 300,
    },
    {
      field: "monto_total",
      headerName: "Total (CLP)",
      width: 120,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 200,
    },
    {
      field: "despachado",
      headerName: "¿Despachado?",
      width: 120,
      renderCell: ({ row }) => {
        if (Boolean(row.despachado)) {
          return <LocalShippingIcon sx={{ color: "green" }} />;
        }
        return <LocalShippingIcon sx={{ color: "red" }} />;
      },
    },
    {
      field: "",
      headerName: "Enviar a despacho",
      width: 220,
      renderCell: ({ row }) => (
        <Button
          disabled={Boolean(row.despachado)}
          variant="contained"
          color="primary"
          startIcon={<ScheduleSendIcon />}
          onClick={() => actualizaVenta(row.id)}
        >
          Enviar a despacho
        </Button>
      ),
    },
  ];
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    handleFetchVentas();
  }, []);

  const handleFetchVentas = () => {
    axios
      .get("http://localhost:4000/api/v1/ventas")
      .then(({ data }) => {
        setVentas(data);
      })
      .catch((error) => {
        setVentas([]);
      });
  };

  const actualizaVenta = (idVenta) => {
    axios
      .put(`http://localhost:4000/api/v1/ventas/${idVenta}`, { despachado: 1 })
      .then(({ data }) => {
        alert("¡Venta enviada a despacho!");
        handleFetchVentas();
      })
      .then(() => {
        axios
          .post("http://localhost:4000/api/v1/despachos/", { idVenta })
          .then(() => {})
          .catch((error_) => console.log(error_));
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
          <Grid2 container spacing={3}>
            <Grid2 md={12} xs={12}>
              <Typography variant="h3" component="div">
                Ventas/Boletas - FERREMAX
              </Typography>
            </Grid2>
            <Divider />
            <Grid2 md={12} xs={12} sx={{ height: 500 }}>
              <DataGrid rows={ventas} columns={cols} />
            </Grid2>
          </Grid2>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default Ventas;
