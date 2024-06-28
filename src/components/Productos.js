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
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import history from "../history";

const renderProducto = (data, idx) => {
  return (
    <Grid2 md={4} xs={4} key={data.id}>
      <Card sx={{ maxWidth: 345, minHeight: 350, maxHeight: 350 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={
            data.imagen.startsWith("http")
              ? data.imagen
              : `https://picsum.photos/200/300`
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.descripcion} - {`Cantidad: ${data.cantidad}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Agregar</Button>
        </CardActions>
      </Card>
    </Grid2>
  );
};

function handleClick(event) {
  event.preventDefault();

  if (Boolean(event.target.href)) {
    const path = event.target.href.split("/")[3];
    history.push(`/${path}`);
  }
}

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [dataNuevoProducto, setDataNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    cantidad: 0,
    precioUnitario: 0,
    image:
      "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
    moneda: "CLP",
  });

  useEffect(() => {
    handleFetchProductos();
  }, []);

  const handleFetchProductos = () => {
    axios
      .get("http://localhost:4000/api/v1/productos")
      .then(({ data }) => {
        setProductos(data);
      })
      .catch((error) => {
        setProductos([]);
      });
  };

  const handleEditInfo = (e, field) => {
    setDataNuevoProducto((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAggProducto = () => {
    let validado = true;
    Object.keys(dataNuevoProducto).forEach((i) => {
      validado = dataNuevoProducto[i] !== "" && dataNuevoProducto[i] !== 0;
    });

    if (!validado) {
      alert("Debe ingresar todos los datos del producto.");
      return;
    }

    axios
      .post("http://localhost:4000/api/v1/productos/", dataNuevoProducto)
      .then((data) => {
        alert("Producto agregado correctamente");
        handleFetchProductos();
        setDataNuevoProducto({
          nombre: "",
          descripcion: "",
          cantidad: 0,
          precioUnitario: 0,
        });
      })
      .catch((error) => console.log(error));
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
                Listado de Productos - FERREMAX
              </Typography>
            </Grid2>
            <Divider />
            {productos?.map((item, idx) => renderProducto(item))}
          </Grid2>
        </Paper>
      </Grid2>
      <Grid2 md={12} xs={12}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid2 container spacing={3}>
            <Grid2 md={12} xs={12}>
              <Typography variant="h3" component="div">
                Nuevo Producto
              </Typography>
            </Grid2>
            <Divider />
            <Grid2 md={12} xs={12}>
              <Grid2 container spacing={2}>
                <Grid2 md={3} xs={12} sx={{ pt: 2 }}>
                  <TextField
                    value={dataNuevoProducto["nombre"]}
                    id="nombre"
                    label="Nombre Producto"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => handleEditInfo(e, "nombre")}
                  />
                </Grid2>
                <Grid2 md={3} xs={12} sx={{ pt: 2 }}>
                  <TextField
                    value={dataNuevoProducto["descripcion"]}
                    id="descripcion"
                    label="Descripcion Producto"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => handleEditInfo(e, "descripcion")}
                  />
                </Grid2>
                <Grid2 md={3} xs={12} sx={{ pt: 2 }}>
                  <TextField
                    value={dataNuevoProducto["cantidad"]}
                    id="cantidad"
                    label="Cantidad"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => handleEditInfo(e, "cantidad")}
                  />
                </Grid2>
                <Grid2 md={3} xs={12}>
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-precio">
                      Precio Unitario
                    </InputLabel>
                    <OutlinedInput
                      value={dataNuevoProducto["precioUnitario"]}
                      id="outlined-adornment-precio"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Precio Unitario"
                      fullWidth
                      onChange={(e) => handleEditInfo(e, "precioUnitario")}
                    />
                  </FormControl>
                </Grid2>
                <Grid2 md={3} xs={12} sx={{ pt: 2 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    startIcon={<CheckIcon />}
                    sx={{ height: "100%" }}
                    onClick={handleAggProducto}
                  >
                    Agregar
                  </Button>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default Productos;
