import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import empresa from "../assets/img/empresa.jpeg";

const CompanyHistory = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Imagen Destacada */}
      <Box
        component="img"
        src={empresa}
        alt="Nuestra historia"
        sx={{
          width: "100%",
          height: { xs: 200, md: 350 },
          objectFit: "cover",
          borderRadius: "12px",
          boxShadow: 3,
        }}
      />

      {/* Contenedor con fondo degradado */}
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          mt: -3,
          backgroundImage: "linear-gradient(135deg,rgb(60, 75, 139), #D2B48C)",
          color: "rgb(31, 27, 19)",
          borderRadius: "12px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Nuestra Historia
        </Typography>
        <Typography variant="body1" paragraph>
          En el año <strong>2020</strong>, dos hermanos, <strong>Marcelo y Dario Becerra</strong>,
          decidieron emprender un camino en el mundo de los negocios con un objetivo claro:
          ofrecer productos de alta calidad para autos y motos.
        </Typography>
        <Typography variant="body1" paragraph>
          Con mucho esfuerzo y dedicación, fueron ganando la confianza de sus primeros clientes,
          logrando posicionarse en el mercado.
        </Typography>
        <Typography variant="body1" paragraph>
          Con el tiempo, su visión empresarial se expandió, atrayendo más clientes y diversificando
          su catálogo. Lo que comenzó como un negocio enfocado en productos para automóviles y
          motocicletas, evolucionó hasta convertirse en una empresa con presencia en múltiples rubros,
          incluyendo carpintería y electrónica.
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Hoy, seguimos creciendo, ofreciendo una amplia gama de productos y manteniendo el mismo
          espíritu emprendedor con el que comenzamos.
        </Typography>
      </Paper>
    </Container>
  );
};

export default CompanyHistory;
