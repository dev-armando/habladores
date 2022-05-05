/**
 * @author Armando Rojas <armando.develop@gmail.com>
 * @github: https://github.com/dev-armando
 */
var vue_instance = new Vue({
  el: "#app",
  components: {},
  data: {
    loading: true,
    code: "",
    message: "",
    product: [],
  },
  created: function () {
    this.$nextTick(async function () {
      this.message = "Esperando codigo de Barras";
    });
  },
  mounted() {
    setInterval(() => {
      this.getFocus();
    }, 1000);
  },
  methods: {
    callDebounceCode: _.debounce(function () {
      this.getProduct();
    }, 500),
    async getFocus() {
      this.$refs.forFocus.focus();
    },
    async getProduct() {
      try {
        this.loading = true;
        let filters = {
          page: this.page,
        };

        filters.code = this.code;
        const response = await axios({
          method: "Get",
          responseType: "json",
          url: "api/products.php",
          params: filters,
        });
        this.loading = false;
        this.product = response.data.data;

        if (this.product.length < 1) {
          this.message = "Producto no encontrado";
          this.code = "";
        } else {
          this.message = "Producto encontrado";
          this.code = "";

          setTimeout(() => {
            JsBarcode("#code", this.product[0].code, {
              width: 3,
              height: 30,
              
            });
          }, 100);
        }
      } catch (err) {
        this.loading = false;
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error mientras se realizaba la consulta",
          icon: "error", //success,error,warning,info,question
        });
      }
    },
    clearForm() {
      this.code = "";
    },
    roundNumberToTwoDecimal(num) {
      let m = Number((Math.abs(num) * 100).toPrecision(15));
      return Math.round(m) / 100 * Math.sign(num);
    },
    formatNumber(  currency ,  amount ){
   
      let type = '';
  
      if(currency == 'USD'){
       
          type = 'en';
      }
  
      if(currency == 'VED'){
       
          type = 'es-VE'
      }
  
      return  new Intl.NumberFormat(type).format( this.roundNumberToTwoDecimal( amount));
  
  },
  }, //methods
});
