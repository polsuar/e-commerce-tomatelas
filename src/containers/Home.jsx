import React from "react";
import { CssBaseline, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MainFeaturedPost from "../components/MainFeaturedPost";
import FeaturedPost from "../components/FeaturedPost";
import Sidebar from "../components/Sidebar";
import Secciones from "../components/Secciones";
import Products from "../components/Products";
// ICONS
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

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
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "PROMO 1",
    date: "Valido hasta 03/10",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text",
  },
  {
    title: "PROMO 2",
    date: "Valido hasta 06/11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
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
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

export default function Home() {
  const classes = useStyles();

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
