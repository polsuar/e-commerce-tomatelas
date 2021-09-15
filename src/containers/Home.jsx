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
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://images5.alphacoders.com/293/293049.jpg",
  imgText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "Producto Destacado",
    date: "Stock disponible",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "http://codemag.mx/wp-content/uploads/2021/02/portada-3.jpg",
    imageText: "Image Text",
  },
  {
    title: "Promo",
    date: "Valido hasta 06/11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image:
      "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/184/535/products/previa51-986953418a31224c0116082471576575-640-0.png",
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
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

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
