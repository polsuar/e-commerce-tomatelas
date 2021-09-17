import React, { useEffect } from "react";
import { CssBaseline, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MainFeaturedPost from "../components/MainFeaturedPost";
import FeaturedPost from "../components/FeaturedPost";
import Sidebar from "../components/Sidebar";
import Secciones from "../components/Secciones";
import Products from "../components/Products";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../store/products";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  header: {
    marginTop: theme.spacing(10),
  },
  secciones: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: "Todas", url: "#" },
  { title: "Cervezas", url: "#" },
  { title: "Gaseosas", url: "#" },
  { title: "Aguas", url: "#" },
  { title: "Aguas saborizadas", url: "#" },
  { title: "Bebidas energizantes", url: "#" },
  { title: "Bebidas isotónicas", url: "#" },
  { title: "Vinos", url: "#" },
  { title: "Leches", url: "#" },
];

const mainFeaturedPost = {
  title: "PROMO DEL MES",
  description:
    "GRAN PROMO MIX DE CERVEZAS. Llevate hoy tu combo Pack Budweiser Corona Mix X 24 Latas 473ml.",
  image: "https://images5.alphacoders.com/293/293049.jpg",
  imgText: "main image description",
};

const featuredPosts = [
  {
    title: "Producto Destacado",
    date: "Stock disponible",
    description:
      "¡Llevate nuestro producto destacado del mes! Cerveza Andes Origen en todas sus variedades.",
    image:
      "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/178/126/products/dsc000081-eec626183b690c2ff316119455743769-1024-1024.jpg",
    imageText: "Image Text",
  },
  {
    title: "Promo",
    date: "Valido hasta 06/11",
    description:
      "Aprovechá el Combo Vino La Celia Pioneer Malbec X6 + Cabernet Franc X6 que te ofrece ¡Tomatelas!",
    image:
      "https://lh3.googleusercontent.com/proxy/sB2TM_9x3pptzhkL35PPfWE9aQENwf8GfGXAS-nNrl5_NprT3WJqqhJFeQ3JANWKGOXDV2GvJTPX34wf9D3EqToh8zVvcrB_OP8I8h2uiSu7CgbmkCJ36GtnWExGTMIpjewUbNvt0eZpZGrq",
    imageText: "Image Text",
  },
];

const sidebar = {
  archives: [
    { title: "Filtro", url: "#" },
    { title: "Filtro", url: "#" },
    { title: "Filtro", url: "#" },
    { title: "Filtro", url: "#" },
    { title: "Filtro", url: "#" },
    { title: "Filtro", url: "#" },
    { title: "Filtro", url: "#" },
    { title: "Filtro", url: "#" },
    { title: "Filtro", url: "#" },
    { title: "Filtro", url: "#" },
    { title: "Filtro", url: "#" },
  ],
};

export default function Home() {
  const products = useSelector((state) => state.products);
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.header}>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Secciones title="Home" sections={sections} />
          <Grid container spacing={5} className={classes.mainGrid}>
            <Sidebar archives={sidebar.archives} social={sidebar.social} />
            <Products />
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}
