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

    <sui-modal :size="small" v-model="open">
      <sui-modal-header>Subscribe to Magazine</sui-modal-header>
      <sui-modal-content>
        <sui-input placeholder="Email" />
        <sui-input placeholder="Address" />
        <sui-input placeholder="Phone" />
        <sui-modal-description>
          <sui-header>Info</sui-header>
          <p>
            Postovanje cijenjeni korisnici,
            <br>
            Zahtjev za predplatu na magazin Banke se aktivira unosonjem vase email adrese u predvidjeno polje,
            <br>
            Nakon sto vas nase osoblje kontaktira i potvrdi vase informacije slanjem svakog sljedeceg email-a dobit ce te povratni email na vasu adresu sa linkom za skidanje PDF-a magazina i direktni link na stranici za slidanje istog.
          </p>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button floated="right" positive @click.native="toggle">
          OK
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
</style>
