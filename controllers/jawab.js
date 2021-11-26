const Mysql = require("mysql");
const Path = require("path");
const Dotenv = require("dotenv");
const Bcrypt = require('bcryptjs');

Dotenv.config({ path: './.env' });
const Connection = require ("../DBconnection");

const Moment = require("moment");
const { resolve } = require("path");
require("moment/locale/id");  // without this line it didn't work
Moment.locale('id');

/** Insert Jawaban Process */
// exports.registrasi = async (req, res) => {
//     const { iduser, jawabannamabalita, umurbalita, tanggallahir, radiojeniskelamin, balitake, jumlahbalitadilahirkanhidup, jawabannamaibu, jawabanumuribu, radiopekerjaanibu, essayboxk_pekerjaanibu, radiopendidikanibu, jawabannamaayah, jawabanumurayah, radiopekerjaanayah, essayboxm_pekerjaanayah, radiopendidikanayah, jawabanalamat, jawabantelephone, jawabanpenghasilan, jawabanberatbadanbalita, jawabanberatbadansaatini, jawabantinggibadan, radiocarapersalinan, radiosubcarapersalinan, jawabanusiakehamilansaatlahir, ASIIMD, ASI, essayboxa_asi, radiosubasi, radiostatusnutrisi, radiopemberianimunisasi, radiosubpemberianimunisasi_a, radiosubpemberianimunisasi_b, radiosubpemberianimunisasi_c, radiosubpemberianimunisasi_d, radiosubpemberianimunisasi_e, radiosubpemberianimunisasi_f, radiosubpemberianimunisasi_g, jawabanusiameninggal, tanggalkematian, jamkematian, jawabanfaskeskematian, radiodibawakefaskes, radiofaskeslain, radiopenyebabutamakematian, radiosubpernafasan, essayboxm_pernafasan, radiosubgastrontestinal, essayboxl_gastrontestinal, radiosubgizi, essayboxg_gizi, radiosubmalaria, radiosubneurologiskronis, essayboxe_neurologiskronis, radiosubneurologisakut, essayboxh_neurologisakut, radiosubtuberkulosis, radiosubruamdandemam, radiosubhiv, radiosubdaruratbedah, radiosubginjal, radiosubkelenjarendokrin, radiosubhematologi, essayboxg_hematologi, radiosubjantung, radiosubkanker, essayboxh_kanker, radiosubperlindunganbalita, bblr, prematuritas, radiosubinfeksineonatal, radiosubkondisiperinatal, radiosubmalformasicongenital, essayboxa_gejalakematianpanas, essayboxa_gejalakematianbatuk, essayboxa_gejalakematiansesaknafas, essayboxa_gejalakematiannafascepat, essayboxa_gejalakematiantarikandindingdada, essayboxa_gejalakematiancupinghidungpernafasan, essayboxa_gejalakematiannafasberbunyi, essayboxa_gejalakematiandiare, essayboxa_gejalakematianmuntah, essayboxa_gejalakematiankejang, essayboxa_gejalakematianletargi, essayboxa_gejalakematiantidaksadar, essayboxa_gejalakematiantidakbisaminum, essayboxa_gejalakematianpendarahan, essayboxa_gejalakematianlainnya, radiokondisikronis, essayboxk_kondisikronis, jawaban4_4, radio4_5, radio4_6, jawaban4_7, radio5_1, essayboxl_5_1, radio5_2, essayboxi_5_2, soal5_3a, radio5_3b, radio5_3c, essayboxb_5_3c, radio5_4, radio5_5a, essayboxa_5_5a, essayboxb_5_5a, radio5_5b, essayboxa_5_5b, essayboxb_5_5b, radio5_5c, essayboxa_5_5c, essayboxb_5_5c, essayboxb_5_5d, radio5_5e, essayboxa_5_5e, essayboxb_5_5e, radio5_5f, essayboxa_5_5f, essayboxb_5_5f, radio5_5g, essayboxa_5_5g, essayboxb_5_5g, radio5_5h, essayboxa_5_5h, essayboxb_5_5h, radio5_5i, essayboxa_5_5i, essayboxb_5_5i, radio5_6, radio5_7, radio5_8a, radio5_8b, radio5_8c, radio5_8d, radio5_8e, essaybox_6_1, radio6_2, essayboxa_6_2, essayboxb_6_2, radio6_3, essayboxa_6_3, essayboxb_6_3, essaybox_6_4, essaybox_6_5, radio6_6, essayboxa_6_6, essayboxb_6_6, radio6_7, essayboxa_6_7, essayboxb_6_7, essaybox_7_1, essaybox_7_2, essaybox_7_3, soal1_1, soal1_2, soal1_3, soal1_4, soal1_5, soal1_6, soal1_7, soal1_8, soal1_9, subsoal1_9, soal1_10, soal1_11, soal1_12, soal1_13, subsoal1_13, soal1_14, soal1_15, soal1_16, soal1_17, soal2_1, soal2_2, soal2_3, soal2_4, subsoal2_4, soal2_5, soal2_6a, soal2_6b, subsoal2_6b_a, subsoal2_6b_b, soal2_7, soal2_8, subsoal2_8a, subsoal2_8b, subsoal2_8c, subsoal2_8d, subsoal2_8e, subsoal2_8f, subsoal2_8g, soal3_1a, soal3_1b, soal3_1c, soal3_2, soal3_3, soal3_4, soal4_1, subsoal4_1, subessaysoal4_1, subsoal4_1_bblr, subsoal4_1_prematurritas, subsoal4_1_infeksi_neonatal, subsoal4_1_kondisi_perinatal, subsoal4_1_malformasi_congenital, soal4_2, soal4_2_1, soal4_2_2, soal4_2_3, soal4_2_4, soal4_2_5, soal4_2_6, soal4_2_7, soal4_2_8, soal4_2_9, soal4_2_10, soal4_2_11, soal4_2_12, soal4_2_13, soal4_2_14, soal4_3, soal4_3_lainnya, soal4_4, soal4_5, soal4_6, soal4_7, soal5_1, soalsub5_1, soal5_2, soalsub5_2, soal5_3, soal5_3b, soal5_3c, soal5_3c_essay, soal5_4, soal5_5, soal5_5a_a, soal5_5a_b, soal5_5b, soal5_5b_a, soal5_5b_b, soal5_5c, soal5_5c_a, soal5_5c_b, soal5_5d, soal5_5e, soal5_5e_a, soal5_5e_b, soal5_5f, soal5_5f_a, soal5_5f_b, soal5_5g, soal5_5g_a, soal5_5g_b, soal5_5h, soal5_5h_a, soal5_5h_b, soal5_5i, soal5_5i_a, soal5_5i_b, soal5_6, soal5_7, soal5_8, soal5_8b, soal5_8c, soal5_8d, soal5_8e, soal6_1, soal6_2, soal6_2essay, soal6_3, soal6_3essay, soal6_4, soal6_5, soal6_6, soal6_6essay, soal6_7, soal6_7essay, soal7_1, soal7_2, soal7_3} = req.body;
//     var tanggal = Moment().format("YYYY-MM-DD");
//     var waktu = Moment().format("HH:mm:ss");
//     var tglreg = Moment().format("YYYYMMDD");
//     if(iduser){
//         try{
//             const carichar = '%REG-'+ tglreg + '-%';
//             const char = 'REG-'+ tglreg + '-';

//             /** pengambilan nilai paling besar di kode registrasi */
//             const cek_max_reg = await new Promise((resolve, reject) => {
//                 Connection.query("SELECT max(SUBSTRING(kode_registrasi, 14, 4)) as max_id FROM kb_header WHERE kode_registrasi LIKE ? ORDER BY kode_registrasi DESC LIMIT 1", [carichar], (error, results) => {
//                     if(error){
//                         reject(error)
//                     } else {
//                         resolve(results)
//                     }
//                 })
//             })
            
//             if(cek_max_reg){
//                 /** ambil data max_id */
//                 var getId = cek_max_reg[0].max_id;

//                 /** convert getId dari string ke number kemudian kalkulasi di tambah 1 */
//                 var no = Number(getId) + 1;

//                 /** menambahkan angka 0 di depan no dengan maksimal 4 digit, contoh: 0001 */
//                 var newId = char + ("000" + no).slice(-4);

//                 /** insert header */
//                 const insert_header = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_header SET ?", [{id: null, kode_registrasi: newId, id_user: iduser, nama_balita: jawabannamabalita, tanggal_lahir_balita: tanggallahir, nama_ibu: jawabannamaibu, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal 1*/
//                 const insert_detail_1_soal1 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_1, jawaban: jawabannamabalita, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal2*/
//                 const insert_detail_1_soal2 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_2, jawaban: umurbalita, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal3*/
//                 const insert_detail_1_soal3 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_3, jawaban: tanggallahir, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal4*/
//                 const insert_detail_1_soal4 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_4, jawaban: radiojeniskelamin, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal5*/
//                 const insert_detail_1_soal5 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_5, jawaban: balitake, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal6*/
//                 const insert_detail_1_soal6 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_6, jawaban: jumlahbalitadilahirkanhidup, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal7*/
//                 const insert_detail_1_soal7 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_7, jawaban: jawabannamaibu, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal8*/
//                 const insert_detail_1_soal8 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_8, jawaban: jawabanumuribu, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal9*/
//                 const insert_detail_1_soal9 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_9, jawaban: radiopekerjaanibu, soal_essay_jawaban: subsoal1_9, essay_jawaban: essayboxk_pekerjaanibu, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal10*/
//                 const insert_detail_1_soal10 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_10, jawaban: radiopendidikanibu, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal11*/
//                 const insert_detail_1_soal11 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_11, jawaban: jawabannamaayah, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal12*/
//                 const insert_detail_1_soal12 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_12, jawaban: jawabanumurayah, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal13*/
//                 const insert_detail_1_soal13 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_13, jawaban: radiopekerjaanayah, soal_essay_jawaban: subsoal1_13, essay_jawaban: essayboxm_pekerjaanayah, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal14*/
//                 const insert_detail_1_soal14 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_14, jawaban: radiopendidikanayah, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal15*/
//                 const insert_detail_1_soal15 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_15, jawaban: jawabanalamat, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal16*/
//                 const insert_detail_1_soal16 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_16, jawaban: jawabantelephone, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })
//                 /** insert detail 1 soal17*/
//                 const insert_detail_1_soal17 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_17, jawaban: jawabanpenghasilan, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 2 soal21*/
//                 const insert_detail_2_soal21 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_1, jawaban: jawabanberatbadanbalita, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal5:null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 2 soal22*/
//                 const insert_detail_2_soal22 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_2, jawaban: jawabanberatbadansaatini, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null,  jawaban6: null, soal7: null,  jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 2 soal23*/
//                 const insert_detail_2_soal23 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_3, jawaban: jawabantinggibadan, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 2 soal24*/
//                 const insert_detail_2_soal24 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_4, jawaban: radiocarapersalinan, soal1: subsoal2_4, jawaban1: radiosubcarapersalinan, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 2 soal25*/
//                 const insert_detail_2_soal25 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_5, jawaban: jawabanusiakehamilansaatlahir, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 2 soal26*/
//                 let soal_jawaban2 = null;
//                 if(!radiosubasi && essayboxa_asi) {
//                     soal_jawaban2 = subsoal2_6b_a;
//                 } else if(!essayboxa_asi && radiosubasi){
//                     soal_jawaban2 = subsoal2_6b_b;
//                 }

//                 let isi_jawaban2 = null;
//                 if(!radiosubasi && essayboxa_asi) {
//                     isi_jawaban2 = essayboxa_asi;
//                 } else if(!essayboxa_asi && radiosubasi){
//                     isi_jawaban2 = radiosubasi;
//                 }

//                 const insert_detail_2_soal26 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_6a, jawaban: ASIIMD, soal1: soal2_6b, jawaban1: ASI, soal2: soal_jawaban2, jawaban2: isi_jawaban2, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 2 soal27*/
//                 const insert_detail_2_soal27 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_7, jawaban: radiostatusnutrisi, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 2 soal28*/
//                 const insert_detail_2_soal28 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_8, jawaban: radiopemberianimunisasi, soal1: subsoal2_8a, jawaban1: radiosubpemberianimunisasi_a, soal2: subsoal2_8b, jawaban2: radiosubpemberianimunisasi_b, soal3: subsoal2_8c, jawaban3: radiosubpemberianimunisasi_c, soal4: subsoal2_8d, jawaban4: radiosubpemberianimunisasi_d, soal5: subsoal2_8e, jawaban5: radiosubpemberianimunisasi_e, soal6: subsoal2_8f, jawaban6: radiosubpemberianimunisasi_f, soal7: subsoal2_8g, jawaban7: radiosubpemberianimunisasi_g, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 3 soal31*/
//                 const insert_detail_3_soal31 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_1a, jawaban: jawabanusiameninggal, soal1: soal3_1b, jawaban1: tanggalkematian, soal2: soal3_1c, jawaban2: jamkematian, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 3 soal32*/
//                 const insert_detail_3_soal32 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_2, jawaban: jawabanfaskeskematian, soal1: null, jawaban1: null, soal2: null, jawaban2: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 3 soal33*/
//                 const insert_detail_3_soal33 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_3, jawaban: radiodibawakefaskes, soal1: null, jawaban1: null, soal2: null, jawaban2: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 3 soal34*/
//                 const insert_detail_3_soal34 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_4, jawaban: radiofaskeslain, soal1: null, jawaban1: null, soal2: null, jawaban2: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 4 soal41*/
//                 let jawaban41_1 = null;
//                 if(radiosubpernafasan){
//                     jawaban41_1 = radiopenyebabutamakematian
//                 } else if(radiosubgastrontestinal){
//                     jawaban41_1 = radiosubgastrontestinal
//                 } else if(radiosubgizi){
//                     jawaban41_1 = radiosubgizi
//                 } else if(radiosubmalaria){
//                     jawaban41_1 = radiosubmalaria
//                 } else if(radiosubneurologiskronis){
//                     jawaban41_1 = radiosubneurologiskronis
//                 } else if(radiosubneurologisakut){
//                     jawaban41_1 = radiosubneurologisakut
//                 } else if(radiosubtuberkulosis){
//                     jawaban41_1 = radiosubtuberkulosis
//                 } else if(radiosubruamdandemam){
//                     jawaban41_1 = radiosubruamdandemam;
//                 } else if(radiosubhiv){
//                     jawaban41_1 = radiosubhiv
//                 } else if(radiosubdaruratbedah){
//                     jawaban41_1 = radiosubdaruratbedah
//                 } else if(radiosubginjal){
//                     jawaban41_1 = radiosubginjal
//                 } else if(radiosubkelenjarendokrin){
//                     jawaban41_1 = radiosubkelenjarendokrin
//                 } else if(radiosubhematologi){
//                     jawaban41_1 = radiosubhematologi
//                 } else if(radiosubjantung){
//                     jawaban41_1 = radiosubjantung
//                 } else if(radiosubkanker){
//                     jawaban41_1 = radiosubkanker
//                 } else if(radiosubperlindunganbalita){
//                     jawaban41_1 = radiosubperlindunganbalita
//                 }

//                 let jawaban41_2 = null;
//                 if(essayboxm_pernafasan){
//                     jawaban41_2 = essayboxm_pernafasan
//                 } else if(essayboxl_gastrontestinal){
//                     jawaban41_2 = essayboxl_gastrontestinal
//                 } else if(essayboxg_gizi){
//                     jawaban41_2 = essayboxg_gizi
//                 } else if(essayboxe_neurologiskronis){
//                     jawaban41_2 = essayboxe_neurologiskronis
//                 } else if(essayboxh_neurologisakut){
//                     jawaban41_2 = essayboxh_neurologisakut
//                 } else if(essayboxg_hematologi){
//                     jawaban41_2 = essayboxg_hematologi
//                 } else if(essayboxh_kanker){
//                     jawaban41_2 = essayboxh_kanker
//                 }
//                 const insert_detail_4_soal41 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_1, soal1: subsoal4_1, soal2: subessaysoal4_1, soal3: subsoal4_1_bblr, soal4: subsoal4_1_prematurritas, soal5: subsoal4_1_infeksi_neonatal, soal6: subsoal4_1_kondisi_perinatal, soal7: subsoal4_1_malformasi_congenital, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, jawaban: radiofaskeslain, jawaban1: jawaban41_1, jawaban2: jawaban41_2, jawaban3: bblr, jawaban4: prematuritas, jawaban5: radiosubinfeksineonatal, jawaban6: radiosubkondisiperinatal, jawaban7: radiosubmalformasicongenital, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null,date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 4 soal42*/
//                 const insert_detail_4_soal42 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_2, soal1: soal4_2_1, soal2: soal4_2_2, soal3: soal4_2_3, soal4: soal4_2_4, soal5: soal4_2_5, soal6: soal4_2_6, soal7: soal4_2_7, soal8: soal4_2_8, soal9: soal4_2_9, soal10: soal4_2_10, soal11: soal4_2_11, soal12: soal4_2_12, soal13: soal4_2_13, soal14: soal4_2_14, jawaban: essayboxa_gejalakematianpanas, jawaban1: essayboxa_gejalakematianbatuk, jawaban2: essayboxa_gejalakematiansesaknafas, jawaban3: essayboxa_gejalakematiannafascepat, jawaban4: essayboxa_gejalakematiantarikandindingdada, jawaban5: essayboxa_gejalakematiancupinghidungpernafasan, jawaban6: essayboxa_gejalakematiannafasberbunyi, jawaban7: essayboxa_gejalakematiandiare, jawaban8: essayboxa_gejalakematianmuntah, jawaban9: essayboxa_gejalakematiankejang, jawaban10: essayboxa_gejalakematianletargi, jawaban11: essayboxa_gejalakematiantidaksadar, jawaban12: essayboxa_gejalakematiantidakbisaminum, jawaban13: essayboxa_gejalakematianpendarahan, jawaban14: essayboxa_gejalakematianlainnya, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 4 soal43*/
//                 const insert_detail_4_soal43 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_3, soal1: soal4_3_lainnya, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, jawaban: radiokondisikronis, jawaban1: essayboxk_kondisikronis, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null,date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 4 soal44*/
//                 const insert_detail_4_soal44 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_4, soal1: null, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, jawaban: jawaban4_4, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null,date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 4 soal45*/
//                 const insert_detail_4_soal45 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_5, soal1: null, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, jawaban: radio4_5, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null,date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 4 soal46*/
//                 const insert_detail_4_soal46 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_6, soal1: null, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, jawaban: radio4_6, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null,date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 4 soal47*/
//                 const insert_detail_4_soal47 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_7, soal1: null, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, jawaban: jawaban4_7, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null,date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 5 soal51*/
//                 const insert_detail_5_soal51 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_1, soal1: soalsub5_1, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, soal15: null, soal16: null, jawaban: radio5_1, jawaban1: essayboxl_5_1, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null, jawaban15: null, jawaban16: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 5 soal52*/
//                 const insert_detail_5_soal52 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_2, soal1: soalsub5_2, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, soal15: null, soal16: null, jawaban: radio5_2, jawaban1: essayboxi_5_2, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null, jawaban15: null, jawaban16: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 5 soal53*/
//                 const insert_detail_5_soal53 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_3, soal1: soal5_3b, soal2: soal5_3c, soal3: soal5_3c_essay, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, soal15: null, soal16: null, jawaban: soal5_3a, jawaban1: radio5_3b, jawaban2: radio5_3c, jawaban3: essayboxb_5_3c, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null, jawaban15: null, jawaban16: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 5 soal54*/
//                 const insert_detail_5_soal54 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_4, soal1: null, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, soal15: null, soal16: null, jawaban: radio5_4, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null, jawaban15: null, jawaban16: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 5 soal55*/
//                 let essaya = null;
//                 if(essayboxa_5_5a){
//                     essaya = essayboxa_5_5a
//                 } else if(essayboxb_5_5a){
//                     essaya = essayboxb_5_5a
//                 }
//                 let essayb = null;
//                 if(essayboxa_5_5b){
//                     essayb = essayboxa_5_5b
//                 } else if(essayboxb_5_5b){
//                     essayb = essayboxb_5_5b
//                 }
//                 let essayc = null;
//                 if(essayboxa_5_5c){
//                     essayc = essayboxa_5_5c
//                 } else if(essayboxb_5_5c){
//                     essayc = essayboxb_5_5c
//                 }
//                 let essaye = null;
//                 if(essayboxa_5_5e){
//                     essaye = essayboxa_5_5e
//                 } else if(essayboxb_5_5e){
//                     essaye = essayboxb_5_5e
//                 }
//                 let essayf = null;
//                 if(essayboxa_5_5f){
//                     essayf = essayboxa_5_5f
//                 } else if(essayboxb_5_5f){
//                     essayf = essayboxb_5_5f
//                 }
//                 let essayg = null;
//                 if(essayboxa_5_5g){
//                     essayg = essayboxa_5_5g
//                 } else if(essayboxb_5_5g){
//                     essayg = essayboxb_5_5g
//                 }
//                 let essayh = null;
//                 if(essayboxa_5_5h){
//                     essayh = essayboxa_5_5h
//                 } else if(essayboxb_5_5h){
//                     essayh = essayboxb_5_5h
//                 }
//                 let essayi = null;
//                 if(essayboxa_5_5i){
//                     essayi = essayboxa_5_5i
//                 } else if(essayboxb_5_5i){
//                     essayi = essayboxb_5_5i
//                 }

//                 let soal5_5_1_essay = null;
//                 if(essayboxa_5_5a){
//                     soal5_5_1_essay = soal5_5a_a
//                 } else if(essayboxb_5_5a){
//                     soal5_5_1_essay = soal5_5a_b
//                 }
//                 let soal5_5_2_essay = null;
//                 if(essayboxa_5_5b){
//                     soal5_5_2_essay = soal5_5b_a
//                 } else if(essayboxb_5_5b){
//                     soal5_5_2_essay = soal5_5b_b
//                 }
//                 let soal5_5_3_essay = null;
//                 if(essayboxa_5_5c){
//                     soal5_5_3_essay = soal5_5c_a
//                 } else if(essayboxb_5_5c){
//                     soal5_5_3_essay = soal5_5c_b
//                 }
//                 let soal5_5_4_essay = null;
//                 if(essayboxa_5_5e){
//                     soal5_5_4_essay = soal5_5e_a
//                 } else if(essayboxb_5_5e){
//                     soal5_5_4_essay = soal5_5e_b
//                 }
//                 let soal5_5_5_essay = null;
//                 if(essayboxa_5_5f){
//                     soal5_5_5_essay = soal5_5f_a
//                 } else if(essayboxb_5_5f){
//                     soal5_5_5_essay = soal5_5f_b
//                 }
//                 let soal5_5_6_essay = null;
//                 if(essayboxa_5_5g){
//                     soal5_5_6_essay = soal5_5g_a
//                 } else if(essayboxb_5_5g){
//                     soal5_5_6_essay = soal5_5g_b
//                 }
//                 let soal5_5_7_essay = null;
//                 if(essayboxa_5_5h){
//                     soal5_5_7_essay = soal5_5h_a
//                 } else if(essayboxb_5_5h){
//                     soal5_5_7_essay = soal5_5h_b
//                 }
//                 let soal5_5_8_essay = null;
//                 if(essayboxa_5_5i){
//                     soal5_5_8_essay = soal5_5i_a
//                 } else if(essayboxb_5_5i){
//                     soal5_5_8_essay = soal5_5i_b
//                 }
//                 const insert_detail_5_soal55 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_5, soal1: soal5_5_1_essay, soal2: soal5_5b, soal3: soal5_5_2_essay, soal4: soal5_5c, soal5: soal5_5_3_essay, soal6: soal5_5d, soal7: soal5_5_4_essay, soal8: soal5_5e, soal9: soal5_5_5_essay, soal10: soal5_5f, soal11: soal5_5_6_essay, soal12: soal5_5g, soal13: soal5_5_7_essay, soal14: soal5_5h, soal15: soal5_5_8_essay, soal16: soal5_5i, jawaban: radio5_5a, jawaban1: essaya, jawaban2: radio5_5b, jawaban3: essayb, jawaban4: radio5_5c, jawaban5: essayc, jawaban6: essayboxb_5_5d, jawaban7: radio5_5e, jawaban8: essaye, jawaban9: radio5_5f, jawaban10: essayf, jawaban11: radio5_5g, jawaban12: essayg, jawaban13: radio5_5h, jawaban14: essayh, jawaban15: radio5_5i, jawaban16: essayi, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 5 soal56*/
//                 const insert_detail_5_soal56 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_6, soal1: null, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, soal15: null, soal16: null, jawaban: radio5_6, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null, jawaban15: null, jawaban16: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 5 soal57*/
//                 const insert_detail_5_soal57 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_7, soal1: null, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, soal15: null, soal16: null, jawaban: radio5_7, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null, jawaban15: null, jawaban16: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 5 soal58*/
//                 const insert_detail_5_soal58 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_8, soal1: soal5_8b, soal2: soal5_8c, soal3: soal5_8d, soal4: soal5_8e, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, soal15: null, soal16: null, jawaban: radio5_8a, jawaban1: radio5_8b, jawaban2: radio5_8c, jawaban3: radio5_8d, jawaban4: radio5_8e, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null, jawaban15: null, jawaban16: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 6 soal61*/
//                 const insert_detail_6_soal61 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_1, jawaban: essaybox_6_1, soal1: null, jawaban1: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 6 soal62*/
//                 let essay6_2 = null;
//                 if(essayboxa_6_2){
//                     essay6_2 = essayboxa_6_2
//                 } else if(essayboxb_6_2){
//                     essay6_2 = essayboxb_6_2
//                 }
//                 const insert_detail_6_soal62 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_2, jawaban: radio6_2, soal1: soal6_2essay, jawaban1: essay6_2, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 6 soal63*/
//                 let essay6_3 = null;
//                 if(essayboxa_6_3){
//                     essay6_3 = essayboxa_6_3
//                 } else if(essayboxb_6_3){
//                     essay6_3 = essayboxb_6_3
//                 }
//                 const insert_detail_6_soal63 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_3, jawaban: radio6_3, soal1: soal6_3essay, jawaban1: essay6_3, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 6 soal64*/
//                 const insert_detail_6_soal64 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_4, jawaban: essaybox_6_4, soal1: null, jawaban1: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 6 soal65*/
//                 const insert_detail_6_soal65 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_5, jawaban: essaybox_6_5, soal1: null, jawaban1: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 6 soal66*/
//                 let essay6_6 = null;
//                 if(essayboxa_6_6){
//                     essay6_6 = essayboxa_6_6
//                 } else if(essayboxb_6_6){
//                     essay6_6 = essayboxb_6_6
//                 }
//                 const insert_detail_6_soal66 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_6, jawaban: radio6_6, soal1: soal6_6essay, jawaban1: essay6_6, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 6 soal67*/
//                 let essay6_7 = null;
//                 if(essayboxa_6_7){
//                     essay6_7 = essayboxa_6_7
//                 } else if(essayboxb_6_7){
//                     essay6_7 = essayboxb_6_7
//                 }
//                 const insert_detail_6_soal67 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_7, jawaban: radio6_7, soal1: soal6_7essay, jawaban1: essay6_7, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 7 soal71*/
//                 const insert_detail_7_soal71 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_7 SET ?", [{id: null, kode_registrasi: newId, soal: soal7_1, jawaban: essaybox_7_1, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 7 soal72*/
//                 const insert_detail_7_soal72 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_7 SET ?", [{id: null, kode_registrasi: newId, soal: soal7_2, jawaban: essaybox_7_2, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 /** insert detail 7 soal73*/
//                 const insert_detail_7_soal73 = await new Promise((resolve, reject) => {
//                     Connection.query("INSERT INTO kb_detail_7 SET ?", [{id: null, kode_registrasi: newId, soal: soal7_3, jawaban: essaybox_7_3, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
//                         if(error){
//                             reject(error)
//                         } else {
//                             resolve("true")
//                         }
//                     })
//                 })

//                 if(insert_header === "true" && insert_detail_1_soal1 === "true" && insert_detail_1_soal2 === "true" && insert_detail_1_soal3 === "true" && insert_detail_1_soal4 === "true" && insert_detail_1_soal5 === "true" && insert_detail_1_soal6 === "true" && insert_detail_1_soal7 === "true" && insert_detail_1_soal8 === "true" && insert_detail_1_soal9 === "true" && insert_detail_1_soal10 === "true" && insert_detail_1_soal11 === "true" && insert_detail_1_soal12 === "true" && insert_detail_1_soal13 === "true" && insert_detail_1_soal14 === "true" && insert_detail_1_soal15 === "true" && insert_detail_1_soal16 === "true" && insert_detail_1_soal17 === "true" && insert_detail_2_soal21 === "true" && insert_detail_2_soal22 === "true" && insert_detail_2_soal23 === "true" && insert_detail_2_soal24 === "true" && insert_detail_2_soal25 === "true" && insert_detail_2_soal26 === "true" && insert_detail_2_soal27 === "true" && insert_detail_2_soal28 === "true" && insert_detail_3_soal31 == "true" && insert_detail_3_soal32 == "true" && insert_detail_3_soal33 == "true" && insert_detail_3_soal34 == "true" && insert_detail_4_soal41 == "true" && insert_detail_4_soal42 == "true" && insert_detail_4_soal43 == "true" && insert_detail_4_soal44 == "true" && insert_detail_4_soal45 == "true" && insert_detail_4_soal46 == "true" && insert_detail_4_soal47 == "true" && insert_detail_5_soal51 == "true" && insert_detail_5_soal52 == "true" && insert_detail_5_soal53 == "true" && insert_detail_5_soal54 == "true" && insert_detail_5_soal55 == "true" && insert_detail_5_soal56 == "true" && insert_detail_5_soal57 == "true" && insert_detail_5_soal58 == "true" && insert_detail_6_soal61 == "true" && insert_detail_6_soal62 == "true" && insert_detail_6_soal63 == "true" && insert_detail_6_soal64 == "true" && insert_detail_6_soal65 == "true" && insert_detail_6_soal66 == "true" && insert_detail_6_soal67 == "true" && insert_detail_7_soal71 == "true" && insert_detail_7_soal72 == "true" && insert_detail_7_soal73 == "true"){
//                 // if(insert_header == "true"){
//                     req.session.sessionFlash2 = {
//                         type: 'success',
//                         message: 'Simpan data berhasil'
//                     }
//                     res.redirect("/home");
//                 } else {
//                     /** simpan data gagal */
//                     throw new Error("Simpan data gagal");
//                 }
//             } else {
//                 /** pengambilan data max, gagal */
//                 throw new Error("Pengambilan data registrasi, gagal");
//             };
            
//         } catch(e){
//             /** send error */
//             // res.status(500).json({ message: e.message });

//             req.session.sessionFlash = {
//                 type: 'error',
//                 message: e.message
//             }
//             res.redirect("/tambahdatakematian");
//             //console.log(e.message)
//         }
//     } else {
//         req.session.sessionFlash = {
//             type: 'error',
//             message: 'Ada field yang kosong dan wajib diisi'
//         }
//         res.redirect("/home");

//         //console.log("Ada field yang kosong dan wajib diisi");
//     }
// };

/** Insert Jawaban Process */
exports.registrasi = async (req, res) => {
    const { iduser, jawabannamabalita, umurbalita, tanggallahir, radiojeniskelamin, balitake, jumlahbalitadilahirkanhidup, jawabannamaibu, jawabanumuribu, radiopekerjaanibu, essayboxk_pekerjaanibu, radiopendidikanibu, jawabannamaayah, jawabanumurayah, radiopekerjaanayah, essayboxm_pekerjaanayah, radiopendidikanayah, jawabanalamat, jawabantelephone, jawabanpenghasilan, soal1_1, soal1_2, soal1_3, soal1_4, soal1_5, soal1_6, soal1_7, soal1_8, soal1_9, subsoal1_9, soal1_10, soal1_11, soal1_12, soal1_13, subsoal1_13, soal1_14, soal1_15, soal1_16, soal1_17, soal2_1, jawabanberatbadanbalita, soal2_2, jawabanberatbadansaatini, soal2_2a, jawabantinggibadan, soal2_2b, jawabanlingkarkepala, soal2_3, radiocarapersalinan, subsoal2_3, radiosubcarapersalinan, soal2_4, jawabanusiakehamilansaatlahir, soal2_5a, ASIIMD, soal2_5b, ASI, subsoal2_5b_a, essayboxa_asi, subsoal2_5b_b, radiosubasi, soal2_6, radiostatusnutrisi, soal2_7, radiopemberianimunisasi, subsoal2_7a, radiosubpemberianimunisasi_a, subsoal2_7b, radiosubpemberianimunisasi_b, subsoal2_7c, radiosubpemberianimunisasi_c, subsoal2_7d, radiosubpemberianimunisasi_d, subsoal2_7e, radiosubpemberianimunisasi_e, subsoal2_7f, radiosubpemberianimunisasi_f, subsoal2_7g, radiosubpemberianimunisasi_g, subsoal2_7h, radiosubpemberianimunisasi_h, soal3_1a, tanggalkematian, soal3_1b, jawabanusiameninggal, soal3_2, jamkematian, soal3_3, jawabanfaskeskematian, soal3_4, essaybox_alamatfaskes, soal3_5, radiorujukanfaskes, radiosubrujukanfaskes, subradiosubarujukanfaskes, soal3_5_suba_a_e, essaybox_lainnyarujukanfaskes, soal3_5_suba_c, essaybox_obatrujukanfaskes, soal3_6, masalahrujukan, soal3_6_sub_a, essaybox_masalahrujukan, soal3_7, jawabankm, soal3_7a, jawabanjam, soal3_7b, jawabanmenit, soal3_8, faskeshcu, soal3_8a, faskespicu1, soal3_8b, faskespicu2, soal3_8c, faskespicu3, soal3_8d, faskesigdanak, soal3_8e, faskesdokterigd24jam, soal3_8f, faskesdokterspesialisanak, soal3_9, tanggalmasukfaskes, soal3_10, jawaban3_10, soal4_1, radiogejalapanas, soal4_1a, essayboxa_gejalakematianpanas, soal4_1_1, radiogejalabatuk, soal4_1_1a, essayboxa_gejalakematianbatuk, soal4_1_2, radiogejaladiare, soal4_1_2a, essayboxa_gejalakematiandiare, soal4_1_2b, radiotinja, soal4_1_3, radiogejalasesaknafas, soal4_1_3a, essayboxa_gejalakematiansesaknafas, soal4_1_4, radiogejalanafascepat, soal4_1_4a, essayboxa_gejalakematiannafascepat, soal4_1_5, radiogejalatarikandindingdada, soal4_1_5a, essayboxa_gejalakematiantarikandindingdada, soal4_1_6, radiogejalacupinghidungpernafasan, soal4_1_6a, essayboxa_gejalakematiancupinghidungpernafasan, soal4_1_7, radiogejalanafasberbunyi, soal4_1_7a, essayboxa_gejalakematiannafasberbunyi, soal4_1_8, radiogejalamuntah, soal4_1_8a, essayboxa_gejalakematianmuntah, soal4_1_9, radiogejalakejang, soal4_1_9a, essayboxa_gejalakematiankejang, soal4_1_10, radiogejalaletargi, soal4_1_10a, essayboxa_gejalakematianletargi, soal4_1_11, radiogejalatidaksadar, soal4_1_11a, essayboxa_gejalakematiantidaksadar, soal4_1_12, radiogejalatidakbisaminum, soal4_1_12a, essayboxa_gejalakematiantidakbisaminum, soal4_1_13, radiogejalaperdarahan, soal4_1_13a, essayboxa_gejalakematianperdarahan, soal4_1_14, radiogejalapucat, soal4_1_14a, essayboxa_gejalakematianpucat, soal4_1_15, radiogejaladehidrasi, soal4_1_15a, essayboxa_gejalakematiandehidrasi, soal4_1_16, radiogejalasyok, soal4_1_16a, essayboxa_gejalakematiansyok, soal4_1_17, essayboxa_gejalakematianjejastrauma, soal4_1_18, essayboxa_gejalakematianlainnya, soal4_2, radiopemeriksaandarahrutin, soal4_2a, essayboxa_pemeriksaanpenunjangdarahrutin,soal4_2_1, radiopemeriksaanrontgen, soal4_2_1a, essayboxa_pemeriksaanpenunjangrontgen, soal4_2_2, radiopemeriksaanusg, soal4_2_2a, essayboxa_pemeriksaanpenunjangusg, soal4_2_3, radiopemeriksaanlainnya, soal4_2_3a, essayboxa_pemeriksaanpenunjanglainnya, soal4_3, radiopenyebabutamakematian, subsoal4_3, radiosubpernafasan, subessaysoal4_3, essayboxm_pernafasan, radiosubgastrontestinal, essayboxl_gastrontestinal, radiosubgizi, essayboxg_gizi, radiosubmalaria, radiosubneurologiskronis, essayboxe_neurologiskronis, radiosubneurologisakut, essayboxh_neurologisakut, radiosubtuberkulosis, radiosubruamdandemam, radiosubhiv, radiosubdaruratbedah, essayboxi_daruratbedah, radiosubginjal, essayboxe_ginjal, radiosubkelenjarendokrin, essayboxe_endokrin, radiosubhematologi, essayboxg_hematologi, radiosubjantung, essayboxc_jantung, radiosubkanker, essayboxh_kanker, radiosubperlindunganbalita, soal4_4, radiokondisikronis, soal4_4_sindrom, essayboxi_kondisikronis, soal4_4_lainnya, essayboxo_kondisikronis, soal4_5, radiocovid, soal4_5_covidselama, essayboxa_covidselama, soal4_5a, radioruangisolasibalitacovid, soal4_5b, radioapdsesuai, soal4_5c, radioprotokolcovid, soal4_5d, radiokapasitasruangancovid, soal4_5e, radiokematianruangisolasi, soal4_6, jawaban4_6, soal4_7, radio4_7, soal4_8, radio4_8, soal4_9, jawaban4_9, soal5_1, radio5_1, soalsub5_1, essayboxl_5_1, soal5_2, radio5_2, soalsub5_2, essayboxi_5_2, soal5_3, radio5_3a, soal5_3b, radio5_3b, soal5_3c, radio5_3c, soal5_3c_essay, essayboxb_5_3c, soal5_4, radio5_4, soalsub5_4, essayboxi_5_4, soal5_5, radio5_5a, soal5_5a_a, essayboxa_5_5a, soal5_5a_b, essayboxb_5_5a, soal5_5b, radio5_5b, soal5_5b_a, essayboxa_5_5b, soal5_5b_b, essayboxb_5_5b, soal5_5c, radio5_5c, soal5_5c_a, essayboxa_5_5c, soal5_5c_b, essayboxb_5_5c, soal5_5d, radio5_5d, soal5_5d_a, essayboxa_5_5d, soal5_5d_b, essayboxb_5_5d, soal5_5e, radio5_5e, soal5_5e_a, essayboxa_5_5e, soal5_5e_b, essayboxb_5_5e, soal5_5f, radio5_5f, soal5_5f_a, essayboxa_5_5f, soal5_5f_b, essayboxb_5_5f, soal5_5g, radio5_5g, soal5_5g_a, essayboxa_5_5g, soal5_5g_b, essayboxb_5_5g, soal5_5h, radio5_5h, soal5_5h_a, essayboxa_5_5h, soal5_5h_b, essayboxb_5_5h, soal5_5i, radio5_5i, soal5_5i_a, essayboxa_5_5i, soal5_5i_b, essayboxb_5_5i, soal5_5j, radio5_5j, soal5_5j_a, essayboxa_5_5j, soal5_5j_b, essayboxb_5_5j, soal5_5k, radio5_5k, soal5_5k_a, essayboxa_5_5k, soal5_5k_b, essayboxb_5_5k, soal5_5l, radio5_5l, soal5_5l_a, essayboxa_5_5l, soal5_5l_b, essayboxb_5_5l, soal5_6, radio5_6, soal5_6a, essayboxc_5_6a, soal5_7, radio5_7, soal5_7a, essayboxc_5_7a, soal5_8, radio5_8a, soal5_8a_a, essayboxc_5_8a_a, soal5_8b, radio5_8b, soal5_8b_a, essayboxc_5_8b_a, soal5_8c, radio5_8c, soal5_8c_a, essayboxc_5_8c_a, soal6_1, radio6_1, subsoala6_1, essaybox_6_1a, subsoalb6_1, essaybox_6_1b, soal6_1a, radio6_1a, subsoala6_1a, jumlah6_1a, subsoalb6_1a, essayboxa_6_1a, soala6_1b, essayboxa_6_1b, soal6_1c, essayboxc_6_1, soal6_2, radio6_2, soal6_2essay, essayboxa_6_2, soalb6_2essay, essayboxb_6_2, soal6_2a, radio6_2a, subsoala6_2, essayboxa_6_2a, subsoalb6_2, essayboxb_6_2a, soal6_2b, radio6_2b, subsoala6_2b, essayboxa_6_2b, subsoalb6_2b, essayboxb_6_2b, soal6_2c, radio6_2c, subsoala6_2c, essayboxa_6_2c, subsoalb6_2c, essayboxb_6_2c, soal6_3, radio6_3, subsoala6_3, essayboxa_6_3, subsoalb6_3, essayboxb_6_3, soal6_3a, radio6_3a, subsoala6_3a, essayboxa_6_3a, subsoalb6_3a, essayboxb_6_3a, soal6_4, subjawaban6_4,radio6_4, subsoala6_4, essayboxa_6_4, subsoalb6_4, essayboxb_6_4, soal6_5, radio6_5, subsoala6_5, essayboxa_6_5, subsoalb6_5, essayboxb_6_5, soal6_5a, radio6_5a, subsoala6_5a, essayboxa_6_5a, subsoalb6_5a, essayboxb_6_5a, soal6_6, radio6_6, subsoala6_6, essayboxa_6_6, subsoalb6_6, essayboxb_6_6, soal6_6a, radio6_6a, subsoala6_6a, essayboxa_6_6a, subsoalb6_6a, essayboxb_6_6a, soal6_6b, essayboxb_6_6b, soal6_7, radio6_7, subsoala6_7, essayboxa_6_7, subsoalb6_7, essayboxb_6_7, soal6_7a, radio6_7a, subsoala6_7a, essayboxa_6_7a, subsoalb6_7a, essayboxb_6_7a, soal6_7b, radio6_7b, subsoala6_7b, essayboxa_6_7b, subsoalb6_7b, essayboxb_6_7b, soal6_7c, essayboxb_6_7c,  } = req.body;
    var tanggal = Moment().format("YYYY-MM-DD");
    var waktu = Moment().format("HH:mm:ss");
    var tglreg = Moment().format("YYYYMMDD");
    if(iduser){
        try{
            const carichar = '%REG-'+ tglreg + '-%';
            const char = 'REG-'+ tglreg + '-';

            /** pengambilan nilai paling besar di kode registrasi */
            const cek_max_reg = await new Promise((resolve, reject) => {
                Connection.query("SELECT max(SUBSTRING(kode_registrasi, 14, 4)) as max_id FROM kb_header WHERE kode_registrasi LIKE ? ORDER BY kode_registrasi DESC LIMIT 1", [carichar], (error, results) => {
                    if(error){
                        reject(error)
                    } else {
                        resolve(results)
                    }
                })
            })
            
            if(cek_max_reg){
                /** ambil data max_id */
                var getId = cek_max_reg[0].max_id;

                /** convert getId dari string ke number kemudian kalkulasi di tambah 1 */
                var no = Number(getId) + 1;

                /** menambahkan angka 0 di depan no dengan maksimal 4 digit, contoh: 0001 */
                var newId = char + ("000" + no).slice(-4);

                /** insert header */
                const insert_header = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_header SET ?", [{id: null, kode_registrasi: newId, id_user: iduser, nama_balita: jawabannamabalita, tanggal_lahir_balita: tanggallahir, nama_ibu: jawabannamaibu, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal 1*/
                const insert_detail_1_soal1 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_1, jawaban: jawabannamabalita, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal2*/
                const insert_detail_1_soal2 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_2, jawaban: umurbalita, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal3*/
                const insert_detail_1_soal3 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_3, jawaban: tanggallahir, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal4*/
                const insert_detail_1_soal4 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_4, jawaban: radiojeniskelamin, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal5*/
                const insert_detail_1_soal5 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_5, jawaban: balitake, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal6*/
                const insert_detail_1_soal6 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_6, jawaban: jumlahbalitadilahirkanhidup, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal7*/
                const insert_detail_1_soal7 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_7, jawaban: jawabannamaibu, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal8*/
                const insert_detail_1_soal8 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_8, jawaban: jawabanumuribu, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal9*/
                const insert_detail_1_soal9 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_9, jawaban: radiopekerjaanibu, soal_essay_jawaban: subsoal1_9, essay_jawaban: essayboxk_pekerjaanibu, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal10*/
                const insert_detail_1_soal10 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_10, jawaban: radiopendidikanibu, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal11*/
                const insert_detail_1_soal11 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_11, jawaban: jawabannamaayah, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal12*/
                const insert_detail_1_soal12 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_12, jawaban: jawabanumurayah, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal13*/
                const insert_detail_1_soal13 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_13, jawaban: radiopekerjaanayah, soal_essay_jawaban: subsoal1_13, essay_jawaban: essayboxm_pekerjaanayah, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal14*/
                const insert_detail_1_soal14 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_14, jawaban: radiopendidikanayah, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal15*/
                const insert_detail_1_soal15 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_15, jawaban: jawabanalamat, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal16*/
                const insert_detail_1_soal16 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_16, jawaban: jawabantelephone, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal17*/
                const insert_detail_1_soal17 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, soal: soal1_17, jawaban: jawabanpenghasilan, soal_essay_jawaban: null, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal21*/
                const insert_detail_2_soal21 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_1, jawaban: jawabanberatbadanbalita, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal5:null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal22*/
                const insert_detail_2_soal22 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_2, jawaban: jawabanberatbadansaatini, soal1: soal2_2a, jawaban1: jawabantinggibadan, soal2: soal2_2b, jawaban2: jawabanlingkarkepala, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null,  jawaban6: null, soal7: null,  jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal23*/
                const insert_detail_2_soal23 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_3, jawaban: radiocarapersalinan, soal1: subsoal2_3, jawaban1: radiosubcarapersalinan, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal24*/
                const insert_detail_2_soal24 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_4, jawaban: jawabanusiakehamilansaatlahir, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal25*/
                let soal_jawaban2 = null;
                if(!radiosubasi && essayboxa_asi) {
                    soal_jawaban2 = subsoal2_5b_a;
                } else if(!essayboxa_asi && radiosubasi){
                    soal_jawaban2 = subsoal2_5b_b;
                }

                let isi_jawaban2 = null;
                if(!radiosubasi && essayboxa_asi) {
                    isi_jawaban2 = essayboxa_asi;
                } else if(!essayboxa_asi && radiosubasi){
                    isi_jawaban2 = radiosubasi;
                }
                const insert_detail_2_soal25 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_5a, jawaban: ASIIMD, soal1: soal2_5b, jawaban1: ASI, soal2: soal_jawaban2, jawaban2: isi_jawaban2, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal26*/
                const insert_detail_2_soal26 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_6, jawaban: radiostatusnutrisi, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal27*/
                const insert_detail_2_soal27 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_7, jawaban: radiopemberianimunisasi, soal1: subsoal2_7a, jawaban1: radiosubpemberianimunisasi_a, soal2: subsoal2_7b, jawaban2: radiosubpemberianimunisasi_b, soal3: subsoal2_7c, jawaban3: radiosubpemberianimunisasi_c, soal4: subsoal2_7d, jawaban4: radiosubpemberianimunisasi_d, soal5: subsoal2_7e, jawaban5: radiosubpemberianimunisasi_e, soal6: subsoal2_7f, jawaban6: radiosubpemberianimunisasi_f, soal7: subsoal2_7g, jawaban7: radiosubpemberianimunisasi_g, soal8: subsoal2_7h, jawaban8: radiosubpemberianimunisasi_h, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 3 soal31*/
                const insert_detail_3_soal31 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_1a, jawaban: tanggalkematian, soal1: soal3_1b, jawaban1: jawabanusiameninggal, soal2: null, jawaban2: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 3 soal32*/
                const insert_detail_3_soal32 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_2, jawaban: jamkematian, soal1: null, jawaban1: null, soal2: null, jawaban2: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 3 soal33*/
                const insert_detail_3_soal33 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_3, jawaban: jawabanfaskeskematian, soal1: null, jawaban1: null, soal2: null, jawaban2: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 3 soal34*/
                const insert_detail_3_soal34 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_4, jawaban: essaybox_alamatfaskes, soal1: null, jawaban1: null, soal2: null, jawaban2: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 3 soal35*/
                let isi_jawaban2_35 = null;
                if(!subradiosubarujukanfaskes && essaybox_obatrujukanfaskes){
                    isi_jawaban2_35 = essaybox_obatrujukanfaskes
                } else if(!essaybox_obatrujukanfaskes && subradiosubarujukanfaskes){
                    isi_jawaban2_35 = subradiosubarujukanfaskes
                }
                const insert_detail_3_soal35 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_5, jawaban: radiorujukanfaskes, soal1: null, jawaban1: radiosubrujukanfaskes, soal2: null, jawaban2: isi_jawaban2_35, soal3: soal3_5_suba_a_e, jawaban3: essaybox_lainnyarujukanfaskes, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 3 soal36*/
                const insert_detail_3_soal36 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_6, jawaban: masalahrujukan, soal1: soal3_6_sub_a, jawaban1: essaybox_masalahrujukan, soal2: null, jawaban2: null, soal3: null, jawaban3: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 3 soal37*/
                const insert_detail_3_soal37 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_7, jawaban: jawabankm, soal1: soal3_7a, jawaban1: jawabanjam, soal2: soal3_7b, jawaban2: jawabanmenit, soal3: null, jawaban3: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 3 soal38*/
                const insert_detail_3_soal38 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_8, jawaban: faskeshcu, soal1: soal3_8a, jawaban1: faskespicu1, soal2: soal3_8b, jawaban2: faskespicu2, soal3: soal3_8c, jawaban3: faskespicu3, soal4: soal3_8d, jawaban4: faskesigdanak, soal5: soal3_8e, jawaban5: faskesdokterigd24jam, soal6: soal3_8f, jawaban6: faskesdokterspesialisanak, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 3 soal39*/
                const insert_detail_3_soal39 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_9, jawaban: tanggalmasukfaskes, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 3 soal310*/
                const insert_detail_3_soal310 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_10, jawaban: jawaban3_10, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal41*/
                const insert_detail_4_soal41 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_1, jawaban: radiogejalapanas, soal1: soal4_1a, jawaban1: essayboxa_gejalakematianpanas, soal2: soal4_1_1, jawaban2: radiogejalabatuk, soal3: soal4_1_1a, jawaban3: essayboxa_gejalakematianbatuk, soal4: soal4_1_2, jawaban4: radiogejaladiare, soal5: soal4_1_2a, jawaban5: essayboxa_gejalakematiandiare, soal6: soal4_1_2b, jawaban6: radiotinja, soal7: soal4_1_3, jawaban7: radiogejalasesaknafas, soal8: soal4_1_3a, jawaban8: essayboxa_gejalakematiansesaknafas, soal9: soal4_1_4, jawaban9: radiogejalanafascepat, soal10: soal4_1_4a, jawaban10: essayboxa_gejalakematiannafascepat, soal11: soal4_1_5, jawaban11: radiogejalatarikandindingdada, soal12: soal4_1_5a, jawaban12: essayboxa_gejalakematiantarikandindingdada, soal13: soal4_1_6, jawaban13: radiogejalacupinghidungpernafasan, soal14: soal4_1_6a, jawaban14: essayboxa_gejalakematiancupinghidungpernafasan, soal15: soal4_1_7, jawaban15: radiogejalanafasberbunyi, soal16: soal4_1_7a, jawaban16: essayboxa_gejalakematiannafasberbunyi, soal17: soal4_1_8, jawaban18: radiogejalamuntah, soal19: soal4_1_8a, jawaban19: essayboxa_gejalakematianmuntah, soal20: soal4_1_9, jawaban20: radiogejalakejang, soal21: soal4_1_9a, jawaban21: essayboxa_gejalakematiankejang, soal22: soal4_1_10, jawaban22: radiogejalaletargi, soal23: soal4_1_10a, jawaban23: essayboxa_gejalakematianletargi, soal24: soal4_1_11, jawaban24: radiogejalatidaksadar, soal25: soal4_1_11a, jawaban25: essayboxa_gejalakematiantidaksadar, soal26: soal4_1_12, jawaban26: radiogejalatidakbisaminum, soal27: soal4_1_12a, jawaban27: essayboxa_gejalakematiantidakbisaminum, soal28: soal4_1_13, jawaban28: radiogejalaperdarahan, soal29: soal4_1_13a, jawaban29: essayboxa_gejalakematianperdarahan, soal30: soal4_1_14, jawaban30: radiogejalapucat, soal31: soal4_1_14a, jawaban31: essayboxa_gejalakematianpucat, soal32: soal4_1_15, jawaban32: radiogejaladehidrasi, soal33: soal4_1_15a, jawaban33: essayboxa_gejalakematiandehidrasi, soal34: soal4_1_16, jawaban34: radiogejalasyok, soal35: soal4_1_16a, jawaban35: essayboxa_gejalakematiansyok, soal36: soal4_1_17, jawabann36: essayboxa_gejalakematianjejastrauma, soal37: soal4_1_18, jawaban37: essayboxa_gejalakematianlainnya, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal42*/
                const insert_detail_4_soal42 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_2, jawaban: radiopemeriksaandarahrutin, soal1: soal4_2a, jawaban1: essayboxa_pemeriksaanpenunjangdarahrutin, soal2: soal4_2_1, jawaban2: radiopemeriksaanrontgen, soal3: soal4_2_1a, jawaban3: essayboxa_pemeriksaanpenunjangrontgen, soal4: soal4_2_2, jawaban4: radiopemeriksaanusg, soal5: soal4_2_2a, jawaban5: essayboxa_pemeriksaanpenunjangusg, soal6: soal4_2_3, jawaban6: radiopemeriksaanlainnya, soal7: soal4_2_3a, jawaban7: essayboxa_pemeriksaanpenunjanglainnya, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, soal24: null, jawaban24: null, soal25: null, jawaban25: null, soal26: null, jawaban26: null, soal27: null, jawaban27: null, soal28: null, jawaban28: null, soal29: null, jawaban29: null, soal30: null, jawaban30: null, soal31: null, jawaban31: null, soal32: null, jawaban32: null, soal33: null, jawaban33: null, soal34: null, jawaban34: null, soal35: null, jawaban35: null, soal36: null, jawabann36: null, soal37: null, jawaban37: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal43*/
                let isijawaban1_soal4 = null;
                if(radiosubpernafasan && !radiosubgastrontestinal && !radiosubgizi && !radiosubmalaria && !radiosubneurologiskronis && !radiosubneurologisakut && !radiosubtuberkulosis && !radiosubruamdandemam && !radiosubhiv && !radiosubdaruratbedah && !radiosubginjal && !radiosubkelenjarendokrin && !radiosubhematologi && !radiosubjantung && !radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubpernafasan;
                } else if(!radiosubpernafasan && radiosubgastrontestinal && !radiosubgizi && !radiosubmalaria && !radiosubneurologiskronis && !radiosubneurologisakut && !radiosubtuberkulosis && !radiosubruamdandemam && !radiosubhiv && !radiosubdaruratbedah && !radiosubginjal && !radiosubkelenjarendokrin && !radiosubhematologi && !radiosubjantung && !radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubgastrontestinal;
                } else if(!radiosubpernafasan && !radiosubgastrontestinal && radiosubgizi && !radiosubmalaria && !radiosubneurologiskronis && !radiosubneurologisakut && !radiosubtuberkulosis && !radiosubruamdandemam && !radiosubhiv && !radiosubdaruratbedah && !radiosubginjal && !radiosubkelenjarendokrin && !radiosubhematologi && !radiosubjantung && !radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubgizi;
                } else if(!radiosubpernafasan && !radiosubgastrontestinal && !radiosubgizi && radiosubmalaria && !radiosubneurologiskronis && !radiosubneurologisakut && !radiosubtuberkulosis && !radiosubruamdandemam && !radiosubhiv && !radiosubdaruratbedah && !radiosubginjal && !radiosubkelenjarendokrin && !radiosubhematologi && !radiosubjantung && !radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubmalaria;
                } else if(!radiosubpernafasan && !radiosubgastrontestinal && !radiosubgizi && !radiosubmalaria && radiosubneurologiskronis && !radiosubneurologisakut && !radiosubtuberkulosis && !radiosubruamdandemam && !radiosubhiv && !radiosubdaruratbedah && !radiosubginjal && !radiosubkelenjarendokrin && !radiosubhematologi && !radiosubjantung && !radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubneurologiskronis;
                } else if(!radiosubpernafasan && !radiosubgastrontestinal && !radiosubgizi && !radiosubmalaria && !radiosubneurologiskronis && radiosubneurologisakut && !radiosubtuberkulosis && !radiosubruamdandemam && !radiosubhiv && !radiosubdaruratbedah && !radiosubginjal && !radiosubkelenjarendokrin && !radiosubhematologi && !radiosubjantung && !radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubneurologisakut;
                } else if(!radiosubpernafasan && !radiosubgastrontestinal && !radiosubgizi && !radiosubmalaria && !radiosubneurologiskronis && !radiosubneurologisakut && radiosubtuberkulosis && !radiosubruamdandemam && !radiosubhiv && !radiosubdaruratbedah && !radiosubginjal && !radiosubkelenjarendokrin && !radiosubhematologi && !radiosubjantung && !radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubtuberkulosis;
                } else if(!radiosubpernafasan && !radiosubgastrontestinal && !radiosubgizi && !radiosubmalaria && !radiosubneurologiskronis && !radiosubneurologisakut && !radiosubtuberkulosis && radiosubruamdandemam && !radiosubhiv && !radiosubdaruratbedah && !radiosubginjal && !radiosubkelenjarendokrin && !radiosubhematologi && !radiosubjantung && !radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubruamdandemam;
                } else if(!radiosubpernafasan && !radiosubgastrontestinal && !radiosubgizi && !radiosubmalaria && !radiosubneurologiskronis && !radiosubneurologisakut && !radiosubtuberkulosis && !radiosubruamdandemam && radiosubhiv && !radiosubdaruratbedah && !radiosubginjal && !radiosubkelenjarendokrin && !radiosubhematologi && !radiosubjantung && !radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubhiv;
                } else if(!radiosubpernafasan && !radiosubgastrontestinal && !radiosubgizi && !radiosubmalaria && !radiosubneurologiskronis && !radiosubneurologisakut && !radiosubtuberkulosis && !radiosubruamdandemam && !radiosubhiv && radiosubdaruratbedah && !radiosubginjal && !radiosubkelenjarendokrin && !radiosubhematologi && !radiosubjantung && !radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubdaruratbedah;
                } else if(!radiosubpernafasan && !radiosubgastrontestinal && !radiosubgizi && !radiosubmalaria && !radiosubneurologiskronis && !radiosubneurologisakut && !radiosubtuberkulosis && !radiosubruamdandemam && !radiosubhiv && !radiosubdaruratbedah && radiosubginjal && !radiosubkelenjarendokrin && !radiosubhematologi && !radiosubjantung && !radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubginjal;
                } else if(!radiosubpernafasan && !radiosubgastrontestinal && !radiosubgizi && !radiosubmalaria && !radiosubneurologiskronis && !radiosubneurologisakut && !radiosubtuberkulosis && !radiosubruamdandemam && !radiosubhiv && !radiosubdaruratbedah && !radiosubginjal && radiosubkelenjarendokrin && !radiosubhematologi && !radiosubjantung && !radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubkelenjarendokrin;
                } else if(!radiosubpernafasan && !radiosubgastrontestinal && !radiosubgizi && !radiosubmalaria && !radiosubneurologiskronis && !radiosubneurologisakut && !radiosubtuberkulosis && !radiosubruamdandemam && !radiosubhiv && !radiosubdaruratbedah && !radiosubginjal && !radiosubkelenjarendokrin && radiosubhematologi && !radiosubjantung && !radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubhematologi;
                } else if(!radiosubpernafasan && !radiosubgastrontestinal && !radiosubgizi && !radiosubmalaria && !radiosubneurologiskronis && !radiosubneurologisakut && !radiosubtuberkulosis && !radiosubruamdandemam && !radiosubhiv && !radiosubdaruratbedah && !radiosubginjal && !radiosubkelenjarendokrin && !radiosubhematologi && radiosubjantung && !radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubjantung;
                } else if(!radiosubpernafasan && !radiosubgastrontestinal && !radiosubgizi && !radiosubmalaria && !radiosubneurologiskronis && !radiosubneurologisakut && !radiosubtuberkulosis && !radiosubruamdandemam && !radiosubhiv && !radiosubdaruratbedah && !radiosubginjal && !radiosubkelenjarendokrin && !radiosubhematologi && !radiosubjantung && radiosubkanker && !radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubkanker;
                } else if(!radiosubpernafasan && !radiosubgastrontestinal && !radiosubgizi && !radiosubmalaria && !radiosubneurologiskronis && !radiosubneurologisakut && !radiosubtuberkulosis && !radiosubruamdandemam && !radiosubhiv && !radiosubdaruratbedah && !radiosubginjal && !radiosubkelenjarendokrin && !radiosubhematologi && !radiosubjantung && !radiosubkanker && radiosubperlindunganbalita){
                    isijawaban1_soal4 = radiosubperlindunganbalita;
                }

                let isijawaban2_soal4 = null;
                if (essayboxm_pernafasan && !essayboxl_gastrontestinal && !essayboxg_gizi && !essayboxe_neurologiskronis && !essayboxh_neurologisakut && !essayboxi_daruratbedah && !essayboxe_ginjal && !essayboxe_endokrin && !essayboxg_hematologi && !essayboxc_jantung && !essayboxh_kanker){
                    isijawaban2_soal4 = essayboxm_pernafasan
                } else if(!essayboxm_pernafasan && essayboxl_gastrontestinal && !essayboxg_gizi && !essayboxe_neurologiskronis && !essayboxh_neurologisakut && !essayboxi_daruratbedah && !essayboxe_ginjal && !essayboxe_endokrin && !essayboxg_hematologi && !essayboxc_jantung && !essayboxh_kanker) {
                    isijawaban2_soal4 = essayboxl_gastrontestinal
                } else if(!essayboxm_pernafasan && !essayboxl_gastrontestinal && essayboxg_gizi && !essayboxe_neurologiskronis && !essayboxh_neurologisakut && !essayboxi_daruratbedah && !essayboxe_ginjal && !essayboxe_endokrin && !essayboxg_hematologi && !essayboxc_jantung && !essayboxh_kanker) {
                    isijawaban2_soal4 = essayboxg_gizi
                } else if(!essayboxm_pernafasan && !essayboxl_gastrontestinal && !essayboxg_gizi && essayboxe_neurologiskronis && !essayboxh_neurologisakut && !essayboxi_daruratbedah && !essayboxe_ginjal && !essayboxe_endokrin && !essayboxg_hematologi && !essayboxc_jantung && !essayboxh_kanker) {
                    isijawaban2_soal4 = essayboxe_neurologiskronis
                } else if(!essayboxm_pernafasan && !essayboxl_gastrontestinal && !essayboxg_gizi && !essayboxe_neurologiskronis && essayboxh_neurologisakut && !essayboxi_daruratbedah && !essayboxe_ginjal && !essayboxe_endokrin && !essayboxg_hematologi && !essayboxc_jantung && !essayboxh_kanker) {
                    isijawaban2_soal4 = essayboxh_neurologisakut
                } else if(!essayboxm_pernafasan && !essayboxl_gastrontestinal && !essayboxg_gizi && !essayboxe_neurologiskronis && !essayboxh_neurologisakut && essayboxi_daruratbedah && !essayboxe_ginjal && !essayboxe_endokrin && !essayboxg_hematologi && !essayboxc_jantung && !essayboxh_kanker) {
                    isijawaban2_soal4 = essayboxi_daruratbedah
                } else if(!essayboxm_pernafasan && !essayboxl_gastrontestinal && !essayboxg_gizi && !essayboxe_neurologiskronis && !essayboxh_neurologisakut && !essayboxi_daruratbedah && essayboxe_ginjal && !essayboxe_endokrin && !essayboxg_hematologi && !essayboxc_jantung && !essayboxh_kanker) {
                    isijawaban2_soal4 = essayboxe_ginjal
                } else if(!essayboxm_pernafasan && !essayboxl_gastrontestinal && !essayboxg_gizi && !essayboxe_neurologiskronis && !essayboxh_neurologisakut && !essayboxi_daruratbedah && !essayboxe_ginjal && essayboxe_endokrin && !essayboxg_hematologi && !essayboxc_jantung && !essayboxh_kanker) {
                    isijawaban2_soal4 = essayboxe_endokrin
                } else if(!essayboxm_pernafasan && !essayboxl_gastrontestinal && !essayboxg_gizi && !essayboxe_neurologiskronis && !essayboxh_neurologisakut && !essayboxi_daruratbedah && !essayboxe_ginjal && !essayboxe_endokrin && essayboxg_hematologi && !essayboxc_jantung && !essayboxh_kanker) {
                    isijawaban2_soal4 = essayboxg_hematologi
                } else if(!essayboxm_pernafasan && !essayboxl_gastrontestinal && !essayboxg_gizi && !essayboxe_neurologiskronis && !essayboxh_neurologisakut && !essayboxi_daruratbedah && !essayboxe_ginjal && !essayboxe_endokrin && !essayboxg_hematologi && essayboxc_jantung && !essayboxh_kanker) {
                    isijawaban2_soal4 = essayboxc_jantung
                } else if(!essayboxm_pernafasan && !essayboxl_gastrontestinal && !essayboxg_gizi && !essayboxe_neurologiskronis && !essayboxh_neurologisakut && !essayboxi_daruratbedah && !essayboxe_ginjal && !essayboxe_endokrin && !essayboxg_hematologi && !essayboxc_jantung && essayboxh_kanker) {
                    isijawaban2_soal4 = essayboxh_kanker
                } else {
                    isijawaban2_soal4 = null
                }
                const insert_detail_4_soal43 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_3, jawaban: radiopenyebabutamakematian, soal1: subsoal4_3, jawaban1: isijawaban1_soal4, soal2: subessaysoal4_3, jawaban2: isijawaban2_soal4, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, soal24: null, jawaban24: null, soal25: null, jawaban25: null, soal26: null, jawaban26: null, soal27: null, jawaban27: null, soal28: null, jawaban28: null, soal29: null, jawaban29: null, soal30: null, jawaban30: null, soal31: null, jawaban31: null, soal32: null, jawaban32: null, soal33: null, jawaban33: null, soal34: null, jawaban34: null, soal35: null, jawaban35: null, soal36: null, jawabann36: null, soal37: null, jawaban37: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal44*/
                let isijawaban1_soal44 = null;
                if(essayboxi_kondisikronis && !essayboxo_kondisikronis){
                    isijawaban1_soal44 = essayboxi_kondisikronis
                } else if(!essayboxi_kondisikronis && essayboxo_kondisikronis){
                    isijawaban1_soal44 = essayboxo_kondisikronis
                }
                const insert_detail_4_soal44 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_4, jawaban: radiokondisikronis, soal1: soal4_4_sindrom, jawaban1: isijawaban1_soal44, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, soal24: null, jawaban24: null, soal25: null, jawaban25: null, soal26: null, jawaban26: null, soal27: null, jawaban27: null, soal28: null, jawaban28: null, soal29: null, jawaban29: null, soal30: null, jawaban30: null, soal31: null, jawaban31: null, soal32: null, jawaban32: null, soal33: null, jawaban33: null, soal34: null, jawaban34: null, soal35: null, jawaban35: null, soal36: null, jawabann36: null, soal37: null, jawaban37: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal45*/
                const insert_detail_4_soal45 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_5, jawaban: radiocovid, soal1: soal4_5_covidselama, jawaban1: essayboxa_covidselama, soal2: soal4_5a, jawaban2: radioruangisolasibalitacovid, soal3: soal4_5b, jawaban3: radioapdsesuai, soal4: soal4_5c, jawaban4: radioprotokolcovid, soal5: soal4_5d, jawaban5: radiokapasitasruangancovid, soal6: soal4_5e, jawaban6: radiokematianruangisolasi, soal7: null, jawaban7: null, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, soal24: null, jawaban24: null, soal25: null, jawaban25: null, soal26: null, jawaban26: null, soal27: null, jawaban27: null, soal28: null, jawaban28: null, soal29: null, jawaban29: null, soal30: null, jawaban30: null, soal31: null, jawaban31: null, soal32: null, jawaban32: null, soal33: null, jawaban33: null, soal34: null, jawaban34: null, soal35: null, jawaban35: null, soal36: null, jawabann36: null, soal37: null, jawaban37: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal46*/
                const insert_detail_4_soal46 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_6, jawaban: jawaban4_6, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, soal24: null, jawaban24: null, soal25: null, jawaban25: null, soal26: null, jawaban26: null, soal27: null, jawaban27: null, soal28: null, jawaban28: null, soal29: null, jawaban29: null, soal30: null, jawaban30: null, soal31: null, jawaban31: null, soal32: null, jawaban32: null, soal33: null, jawaban33: null, soal34: null, jawaban34: null, soal35: null, jawaban35: null, soal36: null, jawabann36: null, soal37: null, jawaban37: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal47*/
                const insert_detail_4_soal47 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_7, jawaban: radio4_7, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, soal24: null, jawaban24: null, soal25: null, jawaban25: null, soal26: null, jawaban26: null, soal27: null, jawaban27: null, soal28: null, jawaban28: null, soal29: null, jawaban29: null, soal30: null, jawaban30: null, soal31: null, jawaban31: null, soal32: null, jawaban32: null, soal33: null, jawaban33: null, soal34: null, jawaban34: null, soal35: null, jawaban35: null, soal36: null, jawabann36: null, soal37: null, jawaban37: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal48*/
                const insert_detail_4_soal48 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_8, jawaban: radio4_8, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, soal24: null, jawaban24: null, soal25: null, jawaban25: null, soal26: null, jawaban26: null, soal27: null, jawaban27: null, soal28: null, jawaban28: null, soal29: null, jawaban29: null, soal30: null, jawaban30: null, soal31: null, jawaban31: null, soal32: null, jawaban32: null, soal33: null, jawaban33: null, soal34: null, jawaban34: null, soal35: null, jawaban35: null, soal36: null, jawabann36: null, soal37: null, jawaban37: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal49*/
                const insert_detail_4_soal49 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_9, jawaban: jawaban4_9, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, soal24: null, jawaban24: null, soal25: null, jawaban25: null, soal26: null, jawaban26: null, soal27: null, jawaban27: null, soal28: null, jawaban28: null, soal29: null, jawaban29: null, soal30: null, jawaban30: null, soal31: null, jawaban31: null, soal32: null, jawaban32: null, soal33: null, jawaban33: null, soal34: null, jawaban34: null, soal35: null, jawaban35: null, soal36: null, jawabann36: null, soal37: null, jawaban37: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal51*/
                const insert_detail_5_soal51 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_1, jawaban:radio5_1, soal1: soalsub5_1, jawaban1:  essayboxl_5_1, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban17: null, soal18: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal52*/
                const insert_detail_5_soal52 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_2, jawaban:radio5_2, soal1: soalsub5_2, jawaban1: essayboxi_5_2, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban17: null, soal18: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal53*/
                const insert_detail_5_soal53 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_3, jawaban:radio5_3a, soal1: soal5_3b, jawaban1: radio5_3b, soal2: soal5_3c, jawaban2: radio5_3c, soal3: soal5_3c_essay, jawaban3: essayboxb_5_3c, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban17: null, soal18: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal54*/
                const insert_detail_5_soal54 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_4, jawaban:radio5_4, soal1: soalsub5_4, jawaban1: essayboxi_5_4, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban17: null, soal18: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal55*/
                let isisoal1_soal55 = null
                let isijawaban1_soal55 = null
                if(essayboxa_5_5a && !essayboxb_5_5a){
                    isisoal1_soal55 = soal5_5a_a
                    isijawaban1_soal55 = essayboxa_5_5a
                } else if(!essayboxa_5_5a && essayboxb_5_5a){
                    isisoal1_soal55 = soal5_5a_b
                    isijawaban1_soal55 = essayboxb_5_5a
                }

                let isisoal3_soal55 = null
                let isijawaban3_soal55 = null
                if(essayboxa_5_5b && !essayboxb_5_5b){
                    isisoal3_soal55 = soal5_5b_a
                    isijawaban3_soal55 = essayboxa_5_5b
                } else if(!essayboxa_5_5b && essayboxb_5_5b){
                    isisoal3_soal55 = soal5_5b_b
                    isijawaban3_soal55 = essayboxb_5_5b
                }

                let isisoal5_soal55 = null
                let isijawaban5_soal55 = null
                if(essayboxa_5_5c && !essayboxb_5_5c){
                    isisoal5_soal55 = soal5_5c_a
                    isijawaban5_soal55 = essayboxa_5_5c
                } else if(!essayboxa_5_5c && essayboxb_5_5c){
                    isisoal5_soal55 = soal5_5c_b
                    isijawaban5_soal55 = essayboxb_5_5c
                }

                let isisoal7_soal55 = null
                let isijawaban7_soal55 = null
                if(essayboxa_5_5d && !essayboxb_5_5d){
                    isisoal7_soal55 = soal5_5d_a
                    isijawaban7_soal55 = essayboxa_5_5d
                } else if(!essayboxa_5_5d && essayboxb_5_5d){
                    isisoal7_soal55 = soal5_5d_b
                    isijawaban7_soal55 = essayboxb_5_5d
                }

                let isisoal9_soal55 = null
                let isijawaban9_soal55 = null
                if(essayboxa_5_5e && !essayboxb_5_5e){
                    isisoal9_soal55 = soal5_5e_a
                    isijawaban9_soal55 = essayboxa_5_5e
                } else if(!essayboxa_5_5e && essayboxb_5_5e){
                    isisoal9_soal55 = soal5_5e_b
                    isijawaban9_soal55 = essayboxb_5_5e
                }

                let isisoal11_soal55 = null
                let isijawaban11_soal55 = null
                if(essayboxa_5_5f && !essayboxb_5_5f){
                    isisoal11_soal55 = soal5_5f_a
                    isijawaban11_soal55 = essayboxa_5_5f
                } else if(!essayboxa_5_5f && essayboxb_5_5f){
                    isisoal11_soal55 = soal5_5f_b
                    isijawaban11_soal55 = essayboxb_5_5f
                }

                let isisoal13_soal55 = null
                let isijawaban13_soal55 = null
                if(essayboxa_5_5g && !essayboxb_5_5g){
                    isisoal13_soal55 = soal5_5g_a
                    isijawaban13_soal55 = essayboxa_5_5g
                } else if(!essayboxa_5_5g && essayboxb_5_5g){
                    isisoal13_soal55 = soal5_5g_b
                    isijawaban13_soal55 = essayboxb_5_5g
                }

                let isisoal15_soal55 = null
                let isijawaban15_soal55 = null
                if(essayboxa_5_5h && !essayboxb_5_5h){
                    isisoal15_soal55 = soal5_5h_a
                    isijawaban15_soal55 = essayboxa_5_5h
                } else if(!essayboxa_5_5h && essayboxb_5_5h){
                    isisoal15_soal55 = soal5_5h_b
                    isijawaban15_soal55 = essayboxb_5_5h
                }

                let isisoal17_soal55 = null
                let isijawaban17_soal55 = null
                if(essayboxa_5_5i && !essayboxb_5_5i){
                    isisoal17_soal55 = soal5_5i_a
                    isijawaban17_soal55 = essayboxa_5_5i
                } else if(!essayboxa_5_5i && essayboxb_5_5i){
                    isisoal17_soal55 = soal5_5i_b
                    isijawaban17_soal55 = essayboxb_5_5i
                }

                let isisoal19_soal55 = null
                let isijawaban19_soal55 = null
                if(essayboxa_5_5j && !essayboxb_5_5j){
                    isisoal19_soal55 = soal5_5j_a
                    isijawaban19_soal55 = essayboxa_5_5j
                } else if(!essayboxa_5_5j && essayboxb_5_5j){
                    isisoal19_soal55 = soal5_5j_b
                    isijawaban19_soal55 = essayboxb_5_5j
                }

                let isisoal21_soal55 = null
                let isijawaban21_soal55 = null
                if(essayboxa_5_5k && !essayboxb_5_5k){
                    isisoal21_soal55 = soal5_5k_a
                    isijawaban21_soal55 = essayboxa_5_5k
                } else if(!essayboxa_5_5k && essayboxb_5_5k){
                    isisoal21_soal55 = soal5_5k_b
                    isijawaban21_soal55 = essayboxb_5_5k
                }

                let isisoal23_soal55 = null
                let isijawaban23_soal55 = null
                if(essayboxa_5_5l && !essayboxb_5_5l){
                    isisoal23_soal55 = soal5_5l_a
                    isijawaban23_soal55 = essayboxa_5_5l
                } else if(!essayboxa_5_5l && essayboxb_5_5l){
                    isisoal23_soal55 = soal5_5l_b
                    isijawaban23_soal55 = essayboxb_5_5l
                }

                const insert_detail_5_soal55 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_5, jawaban:radio5_5a, soal1: isisoal1_soal55, jawaban1: isijawaban1_soal55, soal2: soal5_5b, jawaban2: radio5_5b, soal3: isisoal3_soal55, jawaban3: isijawaban3_soal55, soal4: soal5_5c, jawaban4: radio5_5c, soal5: isisoal5_soal55, jawaban5: isijawaban5_soal55, soal6: soal5_5d, jawaban6: radio5_5d, soal7: isisoal7_soal55, jawaban7: isijawaban7_soal55, soal8: soal5_5e, jawaban8: radio5_5e, soal9: isisoal9_soal55, jawaban9: isijawaban9_soal55, soal10: soal5_5f, jawaban10: radio5_5f, soal11: isisoal11_soal55, jawaban11: isijawaban11_soal55, soal12: soal5_5g, jawaban12: radio5_5g, soal13: isisoal13_soal55, jawaban13: isijawaban13_soal55, soal14: soal5_5h, jawaban14: radio5_5h, soal15: isisoal15_soal55, jawaban15: isijawaban15_soal55, soal16: soal5_5i, jawaban16: radio5_5i, soal17: isisoal17_soal55, jawaban17: isijawaban17_soal55, soal18: soal5_5j, jawaban18: radio5_5j, soal19: isisoal19_soal55, jawaban19: isijawaban19_soal55, soal20: soal5_5k, jawaban20: radio5_5k, soal21: isisoal21_soal55, jawaban21: isijawaban21_soal55, soal22: soal5_5l, jawaban22: radio5_5l, soal23: isisoal23_soal55, jawaban23: isijawaban23_soal55, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal56*/
                const insert_detail_5_soal56 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_6, jawaban:radio5_6, soal1: soal5_6a, jawaban1: essayboxc_5_6a, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban17: null, soal18: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal57*/
                const insert_detail_5_soal57 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_7, jawaban:radio5_7, soal1: soal5_7a, jawaban1: essayboxc_5_7a, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban17: null, soal18: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal58*/
                const insert_detail_5_soal58 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_8, jawaban:radio5_8a, soal1: soal5_8a_a, jawaban1: essayboxc_5_8a_a, soal2: soal5_8b, jawaban2: radio5_8b, soal3: soal5_8b_a, jawaban3: essayboxc_5_8b_a, soal4: soal5_8c, jawaban4: radio5_8c, soal5: soal5_8c_a, jawaban5: essayboxc_5_8c_a, soal6: null, jawaban6: null, soal7: null, jawaban7: null, soal8: null, jawaban8: null, soal9: null, jawaban9: null, soal10: null, jawaban10: null, soal11: null, jawaban11: null, soal12: null, jawaban12: null, soal13: null, jawaban13: null, soal14: null, jawaban14: null, soal15: null, jawaban15: null, soal16: null, jawaban16: null, soal17: null, jawaban17: null, soal18: null, jawaban18: null, soal19: null, jawaban19: null, soal20: null, jawaban20: null, soal21: null, jawaban21: null, soal22: null, jawaban22: null, soal23: null, jawaban23: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 6 soal61*/
                let isisoal1_soal61 = null;
                let isijawaban1_soal61 = null;
                if(essaybox_6_1a && !essaybox_6_1b){
                    isisoal1_soal61 = subsoala6_1
                    isijawaban1_soal61 = essaybox_6_1a
                } else if(!essaybox_6_1a && essaybox_6_1b){
                    isisoal1_soal61 = subsoalb6_1
                    isijawaban1_soal61 = essaybox_6_1b
                }

                let isisoal3_soal61 = null
                let isijawaban3_saol61 = null
                if(jumlah6_1a && !essayboxa_6_1b){
                    isisoal3_soal61 = subsoala6_1a
                    isijawaban3_saol61 = jumlah6_1a;
                } else if(!jumlah6_1a && essayboxa_6_1b){
                    isisoal3_soal61 = soala6_1b
                    isijawaban3_saol61 = essayboxa_6_1b;
                }

                const insert_detail_6_soal61 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_1, jawaban: radio6_1, soal1: isisoal1_soal61, jawaban1: isijawaban1_soal61, soal2: soal6_1a, jawaban2: radio6_1a, soal3: isisoal3_soal61, jawaban3: isijawaban3_saol61, soal4: subsoalb6_1a, jawaban4: essayboxa_6_1a, soal5: soal6_1c, jawaban5: essayboxc_6_1, soal6: null, jawaban6: null, soal7: null, jawaban7: null,date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 6 soal62*/
                const insert_detail_6_soal62 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_2, jawaban: radio6_2, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null,date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                // /** insert detail 6 soal62*/
                // let essay6_2 = null;
                // if(essayboxa_6_2){
                //     essay6_2 = essayboxa_6_2
                // } else if(essayboxb_6_2){
                //     essay6_2 = essayboxb_6_2
                // }
                // const insert_detail_6_soal62 = await new Promise((resolve, reject) => {
                //     Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_2, jawaban: radio6_2, soal1: soal6_2essay, jawaban1: essay6_2, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                //         if(error){
                //             reject(error)
                //         } else {
                //             resolve("true")
                //         }
                //     })
                // })

                // /** insert detail 6 soal63*/
                // let essay6_3 = null;
                // if(essayboxa_6_3){
                //     essay6_3 = essayboxa_6_3
                // } else if(essayboxb_6_3){
                //     essay6_3 = essayboxb_6_3
                // }
                // const insert_detail_6_soal63 = await new Promise((resolve, reject) => {
                //     Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_3, jawaban: radio6_3, soal1: soal6_3essay, jawaban1: essay6_3, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                //         if(error){
                //             reject(error)
                //         } else {
                //             resolve("true")
                //         }
                //     })
                // })

                // /** insert detail 6 soal64*/
                // const insert_detail_6_soal64 = await new Promise((resolve, reject) => {
                //     Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_4, jawaban: essaybox_6_4, soal1: null, jawaban1: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                //         if(error){
                //             reject(error)
                //         } else {
                //             resolve("true")
                //         }
                //     })
                // })

                // /** insert detail 6 soal65*/
                // const insert_detail_6_soal65 = await new Promise((resolve, reject) => {
                //     Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_5, jawaban: essaybox_6_5, soal1: null, jawaban1: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                //         if(error){
                //             reject(error)
                //         } else {
                //             resolve("true")
                //         }
                //     })
                // })

                // /** insert detail 6 soal66*/
                // let essay6_6 = null;
                // if(essayboxa_6_6){
                //     essay6_6 = essayboxa_6_6
                // } else if(essayboxb_6_6){
                //     essay6_6 = essayboxb_6_6
                // }
                // const insert_detail_6_soal66 = await new Promise((resolve, reject) => {
                //     Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_6, jawaban: radio6_6, soal1: soal6_6essay, jawaban1: essay6_6, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                //         if(error){
                //             reject(error)
                //         } else {
                //             resolve("true")
                //         }
                //     })
                // })

                // /** insert detail 6 soal67*/
                // let essay6_7 = null;
                // if(essayboxa_6_7){
                //     essay6_7 = essayboxa_6_7
                // } else if(essayboxb_6_7){
                //     essay6_7 = essayboxb_6_7
                // }
                // const insert_detail_6_soal67 = await new Promise((resolve, reject) => {
                //     Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_7, jawaban: radio6_7, soal1: soal6_7essay, jawaban1: essay6_7, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                //         if(error){
                //             reject(error)
                //         } else {
                //             resolve("true")
                //         }
                //     })
                // })

                // /** insert detail 7 soal71*/
                // const insert_detail_7_soal71 = await new Promise((resolve, reject) => {
                //     Connection.query("INSERT INTO kb_detail_7 SET ?", [{id: null, kode_registrasi: newId, soal: soal7_1, jawaban: essaybox_7_1, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                //         if(error){
                //             reject(error)
                //         } else {
                //             resolve("true")
                //         }
                //     })
                // })

                // /** insert detail 7 soal72*/
                // const insert_detail_7_soal72 = await new Promise((resolve, reject) => {
                //     Connection.query("INSERT INTO kb_detail_7 SET ?", [{id: null, kode_registrasi: newId, soal: soal7_2, jawaban: essaybox_7_2, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                //         if(error){
                //             reject(error)
                //         } else {
                //             resolve("true")
                //         }
                //     })
                // })

                // /** insert detail 7 soal73*/
                // const insert_detail_7_soal73 = await new Promise((resolve, reject) => {
                //     Connection.query("INSERT INTO kb_detail_7 SET ?", [{id: null, kode_registrasi: newId, soal: soal7_3, jawaban: essaybox_7_3, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                //         if(error){
                //             reject(error)
                //         } else {
                //             resolve("true")
                //         }
                //     })
                // })

                if(insert_header === "true" && insert_detail_1_soal1 === "true" && insert_detail_1_soal2 === "true" && insert_detail_1_soal3 === "true" && insert_detail_1_soal4 === "true" && insert_detail_1_soal5 === "true" && insert_detail_1_soal6 === "true" && insert_detail_1_soal7 === "true" && insert_detail_1_soal8 === "true" && insert_detail_1_soal9 === "true" && insert_detail_1_soal10 === "true" && insert_detail_1_soal11 === "true" && insert_detail_1_soal12 === "true" && insert_detail_1_soal13 === "true" && insert_detail_1_soal14 === "true" && insert_detail_1_soal15 === "true" && insert_detail_1_soal16 === "true" && insert_detail_1_soal17 === "true" && insert_detail_2_soal21 == "true" && insert_detail_2_soal22 == "true" && insert_detail_2_soal23 == "true" && insert_detail_2_soal24 == "true" && insert_detail_2_soal25 == "true" && insert_detail_2_soal26 == "true" && insert_detail_2_soal27 == "true" && insert_detail_3_soal31 == "true" && insert_detail_3_soal32 == "true" && insert_detail_3_soal33 == "true" && insert_detail_3_soal34 == "true" && insert_detail_3_soal35 == "true" && insert_detail_3_soal36 == "true" && insert_detail_3_soal37 == "true" && insert_detail_3_soal38 == "true" && insert_detail_3_soal39 == "true" && insert_detail_3_soal310 == "true" && insert_detail_4_soal41 == "true" && insert_detail_4_soal42 == "true" && insert_detail_4_soal43 == "true" && insert_detail_4_soal44 == "true" && insert_detail_4_soal45 == "true" && insert_detail_4_soal46 == "true" && insert_detail_4_soal47 == "true" && insert_detail_4_soal48 == "true" && insert_detail_4_soal49 == "true" && insert_detail_5_soal51 == "true" && insert_detail_5_soal52 == "true" && insert_detail_5_soal53 == "true" && insert_detail_5_soal54 == "true" && insert_detail_5_soal55 == "true" && insert_detail_5_soal56 == "true" && insert_detail_5_soal57 == "true" && insert_detail_5_soal58 == "true"){
                // if(insert_header == "true"){
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: 'Simpan data berhasil'
                    }
                    res.redirect("/home");
                } else {
                    /** simpan data gagal */
                    throw new Error("Simpan data gagal");
                }
            } else {
                /** pengambilan data max, gagal */
                throw new Error("Pengambilan data registrasi, gagal");
            };
            
        } catch(e){
            /** send error */
            // res.status(500).json({ message: e.message });

            req.session.sessionFlash = {
                type: 'error',
                message: e.message
            }
            res.redirect("/tambahdatakematian");
            //console.log(e.message)
        }
    } else {
        req.session.sessionFlash = {
            type: 'error',
            message: 'Ada field yang kosong dan wajib diisi'
        }
        res.redirect("/home");

        //console.log("Ada field yang kosong dan wajib diisi");
    }
};