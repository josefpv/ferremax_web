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
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import { DataGrid } from "@mui/x-data-grid";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import LabelIcon from "@mui/icons-material/Label";

import history from "../history";

function handleClick(event) {
  event.preventDefault();

  if (Boolean(event.target.href)) {
    const path = event.target.href.split("/")[3];
    history.push(`/${path}`);
  }
}

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [open, setOpen] = useState(false);
  const [detalles, setDetalles] = useState([]);
  const [ventaSeleccion, setVentaSeleccion] = useState([]);

  const handleOpenDetalles = (venta) => {
    console.log("venta", venta);
    setVentaSeleccion(venta);
    axios
      .get(
        `https://ferremaxapi.azurewebsites.net/api/v1/ventas/productos/${venta.id}`
      )
      .then(({ data }) => {
        setDetalles(data);
      });
    setOpen(true);
  };
  const handleCierraDetalles = () => {
    setVentaSeleccion([]);
    setOpen(false);
    setDetalles([]);
  };

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
    {
      field: "Detalles",
      headerName: "Ver",
      width: 220,
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ShoppingBasketRoundedIcon />}
          onClick={() => handleOpenDetalles(row)}
        >
          Ver Productos
        </Button>
      ),
    },
  ];

  useEffect(() => {
    handleFetchVentas();
  }, []);

  const handleFetchVentas = () => {
    axios
      .get("https://ferremaxapi.azurewebsites.net/api/v1/ventas")
      .then(({ data }) => {
        setVentas(data);
      })
      .catch((error) => {
        setVentas([]);
      });
  };

  const actualizaVenta = (idVenta) => {
    axios
      .put(`https://ferremaxapi.azurewebsites.net/api/v1/ventas/${idVenta}`, {
        despachado: 1,
      })
      .then(({ data }) => {
        alert("¡Venta enviada a despacho!");
        handleFetchVentas();
      })
      .then(() => {
        axios
          .post("https://ferremaxapi.azurewebsites.net/api/v1/despachos/", {
            idVenta,
          })
          .then(() => {})
          .catch((error_) => console.log(error_));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid2 container justifyContent="center" sx={{ p: 10 }} spacing={3}>
      <Drawer open={open} onClose={() => handleCierraDetalles(false)}>
        <Box sx={{ width: 400 }}>
          <Grid2 container>
            <Grid2 md={12} xs={12} sx={{ p: 2 }}>
              <Typography>Boleta:</Typography>
              <Typography variant="h4">{ventaSeleccion.RazonSocial}</Typography>
              <Typography variant="caption">{ventaSeleccion.fecha}</Typography>
            </Grid2>
            <Grid2 md={12} xs={12} sx={{ p: 2 }}>
              <List>
                {detalles?.map((d) => (
                  <ListItem key={d.id} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <LabelIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={d.nombre}
                        secondary={`x${d.cantidad} = $${d.total}`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}{" "}
              </List>
            </Grid2>

            <Grid2 md={12} xs={12} sx={{ p: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h4">{`Total: $${ventaSeleccion.monto_total}`}</Typography>
            </Grid2>
          </Grid2>
        </Box>
      </Drawer>
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
