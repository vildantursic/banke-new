<template>
  <footer>
    <section class="start">
      <div class="logo" routerLink="home">
        Banke <span class="and">&</span> Biznis
      </div>
      <div>
        <p>
          &copy; Copyright 2017-2018 Banke & Biznis, Sarajevo
        </p>
      </div>
    </section>

    <section class="center">
      <div class="space-between">
        <h4>
          Kontakt:
        </h4>
        <p>
          Phone: {{page.acf.phone}}
        </p>
        <p>
          E-mail: <a :href="`mailto:${page.acf.email}`">{{page.acf.email}}</a>
        </p>
      </div>
      <div>
        <a target="_blank" href="http://banke.forumotion.me/">
          <i class="big comments outline icon"></i>
        </a>
        <a target="_blank" href="https://www.facebook.com/BankeBiznis/">
          <i class="big facebook square icon"></i>
        </a>
        <a target="_blank" href="https://twitter.com/?lang=en">
          <i class="big twitter square icon"></i>
        </a>
      </div>
    </section>

    <section class="end">
      <h4>Partneri:</h4>
      <ul>
        <li>
          <a target="_blank" href="http://www.fba.ba/">Agencija za Bankarstvo FBiH</a>
        </li>
        <li>
          <a target="_blank" href="https://www.abrs.ba/">Agencija za Bankarstvo RS</a>
        </li>
        <li>
          <a target="_blank" href="http://www.cbbh.ba/">Centralna Banka BiH</a>
        </li>
        <li>
          <a target="_blank" href="http://aod.ba/index.php/bhs/">Agencija za osiguranje depozita BiH</a>
        </li>
        <li>
          <a target="_blank" href="http://www.azors.rs.ba/azors/index.html">Agencija za osiguranje RS</a>
        </li>
        <li>
          <a target="_blank" href="http://www.azobih.gov.ba/">Agencija za osiguranje BiH</a>
        </li>
        <li>
          <a target="_blank" href="http://www.nados.ba/hr/">Agencija za nadzor osiguranja FBiH</a>
        </li>
      </ul>
    </section>
  </footer>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        page: {
          acf: {}
        }
      }
    },
    mounted() {
      axios.get(`http://bih.banke-biznis.com/cms/wp-json/wp/v2/pages/23`).then((response) => {
        this.page = response.data
      }).catch((error) => {
        console.log(error);
      });
    }
  }
</script>

<style lang="scss" scoped>
  footer {
    width: 100%;
    min-height: 100px;
    background: #222222;
    margin-top: 50px;
    color: #f2711c;
    padding: 20px 15%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "start center end";

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-rows: 200px 200px 200px;
      grid-template-areas: "start" "center" "end";
      grid-row-gap: 15px;
    }

    a {
      color: #f2711c;
      text-decoration: none;

      &:hover {
        color: white;
      }
    }

    section.start {
      grid-area: start;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .logo {
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,800');
        display: flex;
        align-items: center;
        color: white;
        font-size: 35px;
        font-weight: 800;
        cursor: pointer;
        flex-grow: 1;

        &:focus {
          outline: none;
        }

        @media (max-width: 512px) {
          padding: 0 5px;
        }

        .and {
          color: #D32F2F;
          margin: 0 3px;
        }
      }
    }
    section.center {
      grid-area: center;

      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-direction: column;

      .button-fix {
        width: 150px;
      }
      .magazine {
        margin-top: 10px;
        img {
          width: 150px;
        }
      }
    }
    section.end {
      grid-area: end;

      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-direction: column;

      h4 {
        text-decoration: underline;
      }
      .space-between {
        p {
          margin-bottom: 0;
        }
      }
    }
    .section3 {
      grid-area: section3;
      h4 {
        padding-top: 14px;
        text-decoration: underline;
      }
      ul {
        padding-left: 15px;
      }

    }

    .forum-image {
      height: 28px;
      width: 24px;
      display: flex;
      float: left;
      margin-right: 7px;

      img {
        width: 100%;
      }
    }
  }
</style>
