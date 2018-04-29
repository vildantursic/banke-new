<template>
  <div class="">
    <sui-card class="fix-card" v-if="magazine">
      <sui-card-content>
        <sui-card-header>
          {{magazine.title.rendered}}
        </sui-card-header>
      </sui-card-content>
      <sui-card-content>
        <div class="center">
          <img class="image" :src="magazine._embedded['wp:featuredmedia']['0'].source_url" alt="">
        </div>
      </sui-card-content>
      <sui-card-content extra>
        <sui-button primary @click.native="toggle">Subscribe</sui-button>
      </sui-card-content>
    </sui-card>

    <sui-modal v-model="open">
      <sui-modal-header>Subscribe to Magazine</sui-modal-header>
      <sui-modal-content>
        <sui-modal-description>
          <sui-header>Info</sui-header>
          <p>
            Cijenjeni korisnici,
            <br>
            <br>
            Zahtjev za predplatu na magazin Banke se aktivira unošonjem vaše email adrese u predvidjeno polje,
            <br>
            <br>
            Nakon unošenja podataka dobit ce te email na vašu adresu sa linkom za potvrdu predplate.
            <br>
            <br>
            Ukoliko budete imali pitanja mozete nam se obratiti na email <a href="mailto:info@banke-biznis.com">info@banke-biznis.com</a>
          </p>
        </sui-modal-description>
        <div class="tnp tnp-subscription">
          <form method="post" action="http://bih.banke-biznis.com/cms/?na=s" onsubmit="return newsletter_check(this)">
            <div class="ui input"><input class="tnp-firstname" type="text" name="nn" placeholder="Name"></div>
            <div class="ui input"><input class="tnp-email" type="email" name="ne" required placeholder="Email"></div>
            <div class="ui checkbox"><label><input type="checkbox" name="ny" required class="tnp-privacy"> Subscribing I accept the privacy rules of this site</label></div>
            <div class=""><input class="ui primary button" type="submit" value="Subscribe"></div>
          </form>
        </div>
      </sui-modal-content>
      <sui-modal-actions class="actions">
        <sui-button style="margin: 0 0 10px 0" floated="right" positive @click.native="toggle">
          Close
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
export default {
  props: ['magazine'],
  data() {
    return {
      open: false
    }
  },
  methods: {
    toggle() {
      this.open = !this.open;
    }
  }
}
</script>

<style lang="scss" scoped>
.fix-card {
  width: 100% !important;

  .image {
    width: 50%;
  }

  button {
    width: 100%;
  }
}

.tnp-subscription {
  margin: 20px 0;

  form {
    width: 50%;
    display: flex;
    flex-direction: column;

    * {
        margin: 5px 0;
    }
  }
}
</style>
