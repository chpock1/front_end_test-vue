<template lang="pug">
.text-left
	h1 Форма подачи заявки в отдел сервиса и качества
	form.formBox(@submit.prevent="$_test_form_submit")
		.marginWithGroup
			span Ваш филиал
			span.starValidate(v-if="getDisabledCity") *
			select.form-select.my-2.w-auto(v-model="form.city" :disabled="form.online" v-if="arrayCities.length")
				option(v-for="city in arrayCities" :value="city.title" :key="city.id") {{city.title}}
			input.form-check-input(type="checkbox" v-model="form.online" id="checkbox")
			label(for="checkbox") Онлайн
		.marginWithGroup
			span Тема обращения
			span.starValidate(v-if="getDisabledTheme") *
			.form-check(v-for="(them, index) in arrayThemes" :key="index")
				input.form-check-input(:id="'check'+index" v-model="form.theme" type="radio" :value="them"
					@input="form.customTheme=''")
				label.form-check-label(:for="'check'+index") {{them}}
			input.form-control.w-auto(v-model="form.customTheme" @input="form.theme=''" placeholder="Другое")
		.marginWithGroup
			span Описание проблемы
			span.starValidate(v-if="getDisabledDescription") *
			textarea.form-control(v-model="form.description" placeholder="Введите текст")
		.marginWithGroup
			p Загрузка документов
			span.fileDescription Приложите, пожалуйста, полноэкранный скриншот. это поможет быстрее решить проблему
			input.form-control(type="file" @input="$_test_form_LoadFile")
		button.btn.btn-light(type="submit" :disabled="getDisabledSubmit") Отправить



</template>

<script>
export default {
	name : "testFormIndex",
	data(){
		return{
			form: {
				city: '',
				online: false,
				theme: '',
				customTheme: '',
				description: '',
				document: null
			},
			arrayCities: [],
			arrayThemes: [
				'Недоволен качеством услуг',
				'Расторжение договора',
				'Не приходит письмо активации на почту',
				'Не работает личный кабинет',

			]
		}
	},
	computed:{
		getDisabledSubmit(){
			return this.getDisabledCity||this.getDisabledTheme||this.getDisabledDescription
		},
		getDisabledCity(){
			return !this.form.city && !this.form.online
		},
		getDisabledTheme(){
			return !this.form.theme && !this.form.customTheme
		},
		getDisabledDescription(){
			return !this.form.description
		}
	},
	created() {
		this.$_test_form_getArrCities()
	},
	methods: {
		$_test_form_LoadFile(file){
			this.form.document = file.target.value
		},
		async $_test_form_submit(){
			if(!this.getDisabledSubmit){
				const object = {
					city: this.form.city,
					online: this.form.online,
					theme: this.form.theme||this.form.customTheme,
					description: this.form.description,
					document: this.form.document,
				}
				const theUrl = "https://624d935653326d0cfe4f0ab4.mockapi.io/api/v1/send-form";
				const data = await this.$store.dispatch('request',{method: 'POST',url:theUrl,data: object})
				if(data.success){
					this.form = {
						city: '',
						online: false,
						theme: '',
						customTheme: '',
						description: '',
						document: null
					}
					this.$router.push({name:'formSend'})
				}
				else alert('Ошибка отправки заявки')
			}
		},
		async $_test_form_getArrCities(){
			const url= 'https://624d935653326d0cfe4f0ab4.mockapi.io/api/v1/cities'
			const data = await this.$store.dispatch('request',{method: 'GET',url})
			if(data.length){
				this.arrayCities = data
			}
		}
	}
};
</script>

<style scoped>
.formBox{
	margin-top: 50px;
	padding: 30px;
	text-align: left;
	border: 1px solid grey;
	box-shadow: grey;
	border-radius: 15px;
}
.starValidate{
	color: red;
	position: relative;
}
.warning{
	box-shadow: red;
	border: 1px solid red;
}
.fileDescription{
	font-size: x-small;
	color: darkgrey;
}
.marginWithGroup{
	margin-bottom: 20px;
}
</style>
