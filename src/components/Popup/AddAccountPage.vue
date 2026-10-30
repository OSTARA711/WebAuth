<!-- Path: src/components/Popup/AddAccountPage.vue -->

<template>
  <div>
    <a-text-input label="Issuer" v-model="newAccount.issuer"></a-text-input>

    <a-text-input label="Secret" v-model="newAccount.secret"></a-text-input>

    <details>
      <summary>Advanced options</summary>

      <a-text-input
        label="Account name"
        v-model="newAccount.account"
      ></a-text-input>

      <label>Period (seconds)</label>
      <input
        type="number"
        min="1"
        class="input"
        v-model.number="newAccount.period"
        :disabled="newAccount.type === OTPType.hotp"
      />

      <a-select-input label="Digits" v-model="newAccount.digits">
        <option value="6">6</option>
        <option value="8">8</option>
      </a-select-input>

      <a-select-input label="Algorithm" v-model="newAccount.algorithm">
        <option :value="OTPAlgorithm.SHA1">SHA-1</option>
        <option :value="OTPAlgorithm.SHA256">SHA-256</option>
        <option :value="OTPAlgorithm.SHA512">SHA-512</option>
      </a-select-input>

      <a-select-input label="OTP type" v-model.number="newAccount.type">
        <option :value="OTPType.totp">Time-based (TOTP)</option>
        <option :value="OTPType.hotp">Counter-based (HOTP)</option>
        <option :value="OTPType.battle">Battle.net</option>
        <option :value="OTPType.steam">Steam</option>
      </a-select-input>
    </details>

    <a-button type="small" @click="addNewAccount()"> Add account </a-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { OTPType, OTPEntry, OTPAlgorithm } from "../../models/otp";

export default Vue.extend({
  data: function (): {
    newAccount: {
      issuer: string;
      account: string;
      secret: string;
      type: OTPType;
      period: number | undefined;
      digits: number;
      algorithm: OTPAlgorithm;
    };
  } {
    return {
      newAccount: {
        issuer: "",
        account: "",
        secret: "",
        type: OTPType.totp,
        period: undefined,
        digits: 6,
        algorithm: OTPAlgorithm.SHA1,
      },
    };
  },

  computed: mapState("accounts", ["OTPType", "OTPAlgorithm"]),

  methods: {
    async addNewAccount() {
      this.newAccount.secret = this.newAccount.secret.replace(/ /g, "");

      if (this.newAccount.secret.length < 16) {
        this.$store.commit(
          "notification/alert",
          "The secret must contain at least 16 characters."
        );
        return;
      }

      if (
        !/^[a-z2-7]+=*$/i.test(this.newAccount.secret) &&
        !/^[0-9a-f]+$/i.test(this.newAccount.secret)
      ) {
        this.$store.commit(
          "notification/alert",
          "The secret must be valid Base32 or hexadecimal."
        );
        return;
      }

      let type: OTPType;

      if (
        !/^[a-z2-7]+=*$/i.test(this.newAccount.secret) &&
        /^[0-9a-f]+$/i.test(this.newAccount.secret) &&
        this.newAccount.type === OTPType.totp
      ) {
        type = OTPType.hex;
      } else if (
        !/^[a-z2-7]+=*$/i.test(this.newAccount.secret) &&
        /^[0-9a-f]+$/i.test(this.newAccount.secret) &&
        this.newAccount.type === OTPType.hotp
      ) {
        type = OTPType.hhex;
      } else {
        type = this.newAccount.type;
      }

      if (type === OTPType.hhex || type === OTPType.hotp) {
        this.newAccount.period = undefined;
      } else if (
        typeof this.newAccount.period !== "number" ||
        this.newAccount.period < 1
      ) {
        this.newAccount.period = undefined;
      }

      const defaultEncyptionKey = this.$store.state.accounts.defaultEncryption;

      const encryption = this.$store.state.accounts.encryption[
        defaultEncyptionKey
      ];

      const entry = new OTPEntry(
        {
          type,
          index: 0,
          issuer: this.newAccount.issuer,
          account: this.newAccount.account,
          encrypted: false,
          secret: this.newAccount.secret,
          counter: 0,
          period: this.newAccount.period,
          digits: this.newAccount.digits,
          algorithm: this.newAccount.algorithm,
        },
        encryption
      );

      await entry.create();
      await this.$store.dispatch("accounts/addCode", entry);

      this.$store.commit("style/hideInfo");
      this.$store.commit("style/toggleEdit");

      const codes = document.getElementById("codes");

      if (codes) {
        // Wait for Vue to apply changes to the DOM.
        setTimeout(() => {
          codes.scrollTop = 0;
        }, 0);
      }

      return;
    },
  },
});
</script>
