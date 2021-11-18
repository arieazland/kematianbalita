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
exports.registrasi = async (req, res) => {
    const { iduser, jawabannamabalita, umurbalita, tanggallahir, radiojeniskelamin, balitake, jumlahbalitadilahirkanhidup, jawabannamaibu, jawabanumuribu, radiopekerjaanibu, essayboxk_pekerjaanibu, radiopendidikanibu, jawabannamaayah, jawabanumurayah, radiopekerjaanayah, essayboxm_pekerjaanayah, radiopendidikanayah, jawabanalamat, jawabantelephone, jawabanpenghasilan, jawabanberatbadanbalita, jawabanberatbadansaatini, jawabantinggibadan, radiocarapersalinan, radiosubcarapersalinan, jawabanusiakehamilansaatlahir, ASIIMD, ASI, essayboxa_asi, radiosubasi, radiostatusnutrisi, radiopemberianimunisasi, radiosubpemberianimunisasi_a, radiosubpemberianimunisasi_b, radiosubpemberianimunisasi_c, radiosubpemberianimunisasi_d, radiosubpemberianimunisasi_e, radiosubpemberianimunisasi_f, radiosubpemberianimunisasi_g, jawabanusiameninggal, tanggalkematian, jamkematian, jawabanfaskeskematian, radiodibawakefaskes, radiofaskeslain, radiopenyebabutamakematian, radiosubpernafasan, essayboxm_pernafasan, radiosubgastrontestinal, essayboxl_gastrontestinal, radiosubgizi, essayboxg_gizi, radiosubmalaria, radiosubneurologiskronis, essayboxe_neurologiskronis, radiosubneurologisakut, essayboxh_neurologisakut, radiosubtuberkulosis, radiosubruamdandemam, radiosubhiv, radiosubdaruratbedah, radiosubginjal, radiosubkelenjarendokrin, radiosubhematologi, essayboxg_hematologi, radiosubjantung, radiosubkanker, essayboxh_kanker, radiosubperlindunganbalita, bblr, prematuritas, radiosubinfeksineonatal, radiosubkondisiperinatal, radiosubmalformasicongenital, essayboxa_gejalakematianpanas, essayboxa_gejalakematianbatuk, essayboxa_gejalakematiansesaknafas, essayboxa_gejalakematiannafascepat, essayboxa_gejalakematiantarikandindingdada, essayboxa_gejalakematiancupinghidungpernafasan, essayboxa_gejalakematiannafasberbunyi, essayboxa_gejalakematiandiare, essayboxa_gejalakematianmuntah, essayboxa_gejalakematiankejang, essayboxa_gejalakematianletargi, essayboxa_gejalakematiantidaksadar, essayboxa_gejalakematiantidakbisaminum, essayboxa_gejalakematianpendarahan, essayboxa_gejalakematianlainnya, radiokondisikronis, essayboxk_kondisikronis, jawaban4_4, radio4_5, radio4_6, jawaban4_7, radio5_1, essayboxl_5_1, radio5_2, essayboxi_5_2, soal5_3a, radio5_3b, radio5_3c, essayboxb_5_3c, radio5_4, radio5_5a, essayboxa_5_5a, essayboxb_5_5a, radio5_5b, essayboxa_5_5b, essayboxb_5_5b, radio5_5c, essayboxa_5_5c, essayboxb_5_5c, essayboxb_5_5d, radio5_5e, essayboxa_5_5e, essayboxb_5_5e, radio5_5f, essayboxa_5_5f, essayboxb_5_5f, radio5_5g, essayboxa_5_5g, essayboxb_5_5g, radio5_5h, essayboxa_5_5h, essayboxb_5_5h, radio5_5i, essayboxa_5_5i, essayboxb_5_5i, radio5_6, radio5_7, radio5_8a, radio5_8b, radio5_8c, radio5_8d, radio5_8e, essaybox_6_1, radio6_2, essayboxa_6_2, essayboxb_6_2, radio6_3, essayboxa_6_3, essayboxb_6_3, essaybox_6_4, essaybox_6_5, radio6_6, essayboxa_6_6, essayboxb_6_6, radio6_7, essayboxa_6_7, essayboxb_6_7, essaybox_7_1, essaybox_7_2, essaybox_7_3, soal1_1, soal1_2, soal1_3, soal1_4, soal1_5, soal1_6, soal1_7, soal1_8, soal1_9, subsoal1_9, soal1_10, soal1_11, soal1_12, soal1_13, subsoal1_13, soal1_14, soal1_15, soal1_16, soal1_17, soal2_1, soal2_2, soal2_3, soal2_4, subsoal2_4, soal2_5, soal2_6a, soal2_6b, subsoal2_6b_a, subsoal2_6b_b, soal2_7, soal2_8, subsoal2_8a, subsoal2_8b, subsoal2_8c, subsoal2_8d, subsoal2_8e, subsoal2_8f, subsoal2_8g, soal3_1a, soal3_1b, soal3_1c, soal3_2, soal3_3, soal3_4, soal4_1, subsoal4_1, subessaysoal4_1, subsoal4_1_bblr, subsoal4_1_prematurritas, subsoal4_1_infeksi_neonatal, subsoal4_1_kondisi_perinatal, subsoal4_1_malformasi_congenital, soal4_2, soal4_2_1, soal4_2_2, soal4_2_3, soal4_2_4, soal4_2_5, soal4_2_6, soal4_2_7, soal4_2_8, soal4_2_9, soal4_2_10, soal4_2_11, soal4_2_12, soal4_2_13, soal4_2_14, soal4_3, soal4_3_lainnya, soal4_4, soal4_5, soal4_6, soal4_7, soal5_1, soalsub5_1, soal5_2, soalsub5_2, soal5_3, soal5_3b, soal5_3c, soal5_3c_essay, soal5_4, soal5_5, soal5_5a_a, soal5_5a_b, soal5_5b, soal5_5b_a, soal5_5b_b, soal5_5c, soal5_5c_a, soal5_5c_b, soal5_5d, soal5_5e, soal5_5e_a, soal5_5e_b, soal5_5f, soal5_5f_a, soal5_5f_b, soal5_5g, soal5_5g_a, soal5_5g_b, soal5_5h, soal5_5h_a, soal5_5h_b, soal5_5i, soal5_5i_a, soal5_5i_b, soal5_6, soal5_7, soal5_8, soal5_8b, soal5_8c, soal5_8d, soal5_8e, soal6_1, soal6_2, soal6_2essay, soal6_3, soal6_3essay, soal6_4, soal6_5, soal6_6, soal6_6essay, soal6_7, soal6_7essay, soal7_1, soal7_2, soal7_3} = req.body;
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
                    Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_2, jawaban: jawabanberatbadansaatini, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null,  jawaban6: null, soal7: null,  jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal23*/
                const insert_detail_2_soal23 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_3, jawaban: jawabantinggibadan, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal24*/
                const insert_detail_2_soal24 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_4, jawaban: radiocarapersalinan, soal1: subsoal2_4, jawaban1: radiosubcarapersalinan, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal25*/
                const insert_detail_2_soal25 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_5, jawaban: jawabanusiakehamilansaatlahir, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal26*/
                let soal_jawaban2 = null;
                if(!radiosubasi && essayboxa_asi) {
                    soal_jawaban2 = subsoal2_6b_a;
                } else if(!essayboxa_asi && radiosubasi){
                    soal_jawaban2 = subsoal2_6b_b;
                }

                let isi_jawaban2 = null;
                if(!radiosubasi && essayboxa_asi) {
                    isi_jawaban2 = essayboxa_asi;
                } else if(!essayboxa_asi && radiosubasi){
                    isi_jawaban2 = radiosubasi;
                }

                const insert_detail_2_soal26 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_6a, jawaban: ASIIMD, soal1: soal2_6b, jawaban1: ASI, soal2: soal_jawaban2, jawaban2: isi_jawaban2, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal27*/
                const insert_detail_2_soal27 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_7, jawaban: radiostatusnutrisi, soal1: null, jawaban1: null, soal2: null, jawaban2: null, soal3: null, jawaban3: null, soal4: null, jawaban4: null, soal5: null, jawaban5: null, soal6: null, jawaban6: null, soal7: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal28*/
                const insert_detail_2_soal28 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, soal: soal2_8, jawaban: radiopemberianimunisasi, soal1: subsoal2_8a, jawaban1: radiosubpemberianimunisasi_a, soal2: subsoal2_8b, jawaban2: radiosubpemberianimunisasi_b, soal3: subsoal2_8c, jawaban3: radiosubpemberianimunisasi_c, soal4: subsoal2_8d, jawaban4: radiosubpemberianimunisasi_d, soal5: subsoal2_8e, jawaban5: radiosubpemberianimunisasi_e, soal6: subsoal2_8f, jawaban6: radiosubpemberianimunisasi_f, soal7: subsoal2_8g, jawaban7: radiosubpemberianimunisasi_g, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 3 soal31*/
                const insert_detail_3_soal31 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_1a, jawaban: jawabanusiameninggal, soal1: soal3_1b, jawaban1: tanggalkematian, soal2: soal3_1c, jawaban2: jamkematian, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 3 soal32*/
                const insert_detail_3_soal32 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_2, jawaban: jawabanfaskeskematian, soal1: null, jawaban1: null, soal2: null, jawaban2: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 3 soal33*/
                const insert_detail_3_soal33 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_3, jawaban: radiodibawakefaskes, soal1: null, jawaban1: null, soal2: null, jawaban2: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 3 soal34*/
                const insert_detail_3_soal34 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_3 SET ?", [{id: null, kode_registrasi: newId, soal: soal3_4, jawaban: radiofaskeslain, soal1: null, jawaban1: null, soal2: null, jawaban2: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal41*/
                let jawaban41_1 = null;
                if(radiosubpernafasan){
                    jawaban41_1 = radiopenyebabutamakematian
                } else if(radiosubgastrontestinal){
                    jawaban41_1 = radiosubgastrontestinal
                } else if(radiosubgizi){
                    jawaban41_1 = radiosubgizi
                } else if(radiosubmalaria){
                    jawaban41_1 = radiosubmalaria
                } else if(radiosubneurologiskronis){
                    jawaban41_1 = radiosubneurologiskronis
                } else if(radiosubneurologisakut){
                    jawaban41_1 = radiosubneurologisakut
                } else if(radiosubtuberkulosis){
                    jawaban41_1 = radiosubtuberkulosis
                } else if(radiosubruamdandemam){
                    jawaban41_1 = radiosubruamdandemam;
                } else if(radiosubhiv){
                    jawaban41_1 = radiosubhiv
                } else if(radiosubdaruratbedah){
                    jawaban41_1 = radiosubdaruratbedah
                } else if(radiosubginjal){
                    jawaban41_1 = radiosubginjal
                } else if(radiosubkelenjarendokrin){
                    jawaban41_1 = radiosubkelenjarendokrin
                } else if(radiosubhematologi){
                    jawaban41_1 = radiosubhematologi
                } else if(radiosubjantung){
                    jawaban41_1 = radiosubjantung
                } else if(radiosubkanker){
                    jawaban41_1 = radiosubkanker
                } else if(radiosubperlindunganbalita){
                    jawaban41_1 = radiosubperlindunganbalita
                }

                let jawaban41_2 = null;
                if(essayboxm_pernafasan){
                    jawaban41_2 = essayboxm_pernafasan
                } else if(essayboxl_gastrontestinal){
                    jawaban41_2 = essayboxl_gastrontestinal
                } else if(essayboxg_gizi){
                    jawaban41_2 = essayboxg_gizi
                } else if(essayboxe_neurologiskronis){
                    jawaban41_2 = essayboxe_neurologiskronis
                } else if(essayboxh_neurologisakut){
                    jawaban41_2 = essayboxh_neurologisakut
                } else if(essayboxg_hematologi){
                    jawaban41_2 = essayboxg_hematologi
                } else if(essayboxh_kanker){
                    jawaban41_2 = essayboxh_kanker
                }
                const insert_detail_4_soal41 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_1, soal1: subsoal4_1, soal2: subessaysoal4_1, soal3: subsoal4_1_bblr, soal4: subsoal4_1_prematurritas, soal5: subsoal4_1_infeksi_neonatal, soal6: subsoal4_1_kondisi_perinatal, soal7: subsoal4_1_malformasi_congenital, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, jawaban: radiofaskeslain, jawaban1: jawaban41_1, jawaban2: jawaban41_2, jawaban3: bblr, jawaban4: prematuritas, jawaban5: radiosubinfeksineonatal, jawaban6: radiosubkondisiperinatal, jawaban7: radiosubmalformasicongenital, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null,date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal42*/
                const insert_detail_4_soal42 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_2, soal1: soal4_2_1, soal2: soal4_2_2, soal3: soal4_2_3, soal4: soal4_2_4, soal5: soal4_2_5, soal6: soal4_2_6, soal7: soal4_2_7, soal8: soal4_2_8, soal9: soal4_2_9, soal10: soal4_2_10, soal11: soal4_2_11, soal12: soal4_2_12, soal13: soal4_2_13, soal14: soal4_2_14, jawaban: essayboxa_gejalakematianpanas, jawaban1: essayboxa_gejalakematianbatuk, jawaban2: essayboxa_gejalakematiansesaknafas, jawaban3: essayboxa_gejalakematiannafascepat, jawaban4: essayboxa_gejalakematiantarikandindingdada, jawaban5: essayboxa_gejalakematiancupinghidungpernafasan, jawaban6: essayboxa_gejalakematiannafasberbunyi, jawaban7: essayboxa_gejalakematiandiare, jawaban8: essayboxa_gejalakematianmuntah, jawaban9: essayboxa_gejalakematiankejang, jawaban10: essayboxa_gejalakematianletargi, jawaban11: essayboxa_gejalakematiantidaksadar, jawaban12: essayboxa_gejalakematiantidakbisaminum, jawaban13: essayboxa_gejalakematianpendarahan, jawaban14: essayboxa_gejalakematianlainnya, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal43*/
                const insert_detail_4_soal43 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_3, soal1: soal4_3_lainnya, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, jawaban: radiokondisikronis, jawaban1: essayboxk_kondisikronis, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null,date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal44*/
                const insert_detail_4_soal44 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_4, soal1: null, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, jawaban: jawaban4_4, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null,date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal45*/
                const insert_detail_4_soal45 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_5, soal1: null, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, jawaban: radio4_5, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null,date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal46*/
                const insert_detail_4_soal46 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_6, soal1: null, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, jawaban: radio4_6, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null,date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 4 soal47*/
                const insert_detail_4_soal47 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_4 SET ?", [{id: null, kode_registrasi: newId, soal: soal4_7, soal1: null, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, jawaban: jawaban4_7, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null,date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal51*/
                const insert_detail_5_soal51 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_1, soal1: soalsub5_1, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, soal15: null, soal16: null, jawaban: radio5_1, jawaban1: essayboxl_5_1, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null, jawaban15: null, jawaban16: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal52*/
                const insert_detail_5_soal52 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_2, soal1: soalsub5_2, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, soal15: null, soal16: null, jawaban: radio5_2, jawaban1: essayboxi_5_2, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null, jawaban15: null, jawaban16: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal53*/
                const insert_detail_5_soal53 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_3, soal1: soal5_3b, soal2: soal5_3c, soal3: soal5_3c_essay, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, soal15: null, soal16: null, jawaban: soal5_3a, jawaban1: radio5_3b, jawaban2: radio5_3c, jawaban3: essayboxb_5_3c, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null, jawaban15: null, jawaban16: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal54*/
                const insert_detail_5_soal54 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_4, soal1: null, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, soal15: null, soal16: null, jawaban: radio5_4, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null, jawaban15: null, jawaban16: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal55*/
                let essaya = null;
                if(essayboxa_5_5a){
                    essaya = essayboxa_5_5a
                } else if(essayboxb_5_5a){
                    essaya = essayboxb_5_5a
                }
                let essayb = null;
                if(essayboxa_5_5b){
                    essayb = essayboxa_5_5b
                } else if(essayboxb_5_5b){
                    essayb = essayboxb_5_5b
                }
                let essayc = null;
                if(essayboxa_5_5c){
                    essayc = essayboxa_5_5c
                } else if(essayboxb_5_5c){
                    essayc = essayboxb_5_5c
                }
                let essaye = null;
                if(essayboxa_5_5e){
                    essaye = essayboxa_5_5e
                } else if(essayboxb_5_5e){
                    essaye = essayboxb_5_5e
                }
                let essayf = null;
                if(essayboxa_5_5f){
                    essayf = essayboxa_5_5f
                } else if(essayboxb_5_5f){
                    essayf = essayboxb_5_5f
                }
                let essayg = null;
                if(essayboxa_5_5g){
                    essayg = essayboxa_5_5g
                } else if(essayboxb_5_5g){
                    essayg = essayboxb_5_5g
                }
                let essayh = null;
                if(essayboxa_5_5h){
                    essayh = essayboxa_5_5h
                } else if(essayboxb_5_5h){
                    essayh = essayboxb_5_5h
                }
                let essayi = null;
                if(essayboxa_5_5i){
                    essayi = essayboxa_5_5i
                } else if(essayboxb_5_5i){
                    essayi = essayboxb_5_5i
                }

                let soal5_5_1_essay = null;
                if(essayboxa_5_5a){
                    soal5_5_1_essay = soal5_5a_a
                } else if(essayboxb_5_5a){
                    soal5_5_1_essay = soal5_5a_b
                }
                let soal5_5_2_essay = null;
                if(essayboxa_5_5b){
                    soal5_5_2_essay = soal5_5b_a
                } else if(essayboxb_5_5b){
                    soal5_5_2_essay = soal5_5b_b
                }
                let soal5_5_3_essay = null;
                if(essayboxa_5_5c){
                    soal5_5_3_essay = soal5_5c_a
                } else if(essayboxb_5_5c){
                    soal5_5_3_essay = soal5_5c_b
                }
                let soal5_5_4_essay = null;
                if(essayboxa_5_5e){
                    soal5_5_4_essay = soal5_5e_a
                } else if(essayboxb_5_5e){
                    soal5_5_4_essay = soal5_5e_b
                }
                let soal5_5_5_essay = null;
                if(essayboxa_5_5f){
                    soal5_5_5_essay = soal5_5f_a
                } else if(essayboxb_5_5f){
                    soal5_5_5_essay = soal5_5f_b
                }
                let soal5_5_6_essay = null;
                if(essayboxa_5_5g){
                    soal5_5_6_essay = soal5_5g_a
                } else if(essayboxb_5_5g){
                    soal5_5_6_essay = soal5_5g_b
                }
                let soal5_5_7_essay = null;
                if(essayboxa_5_5h){
                    soal5_5_7_essay = soal5_5h_a
                } else if(essayboxb_5_5h){
                    soal5_5_7_essay = soal5_5h_b
                }
                let soal5_5_8_essay = null;
                if(essayboxa_5_5i){
                    soal5_5_8_essay = soal5_5i_a
                } else if(essayboxb_5_5i){
                    soal5_5_8_essay = soal5_5i_b
                }
                const insert_detail_5_soal55 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_5, soal1: soal5_5_1_essay, soal2: soal5_5b, soal3: soal5_5_2_essay, soal4: soal5_5c, soal5: soal5_5_3_essay, soal6: soal5_5d, soal7: soal5_5_4_essay, soal8: soal5_5e, soal9: soal5_5_5_essay, soal10: soal5_5f, soal11: soal5_5_6_essay, soal12: soal5_5g, soal13: soal5_5_7_essay, soal14: soal5_5h, soal15: soal5_5_8_essay, soal16: soal5_5i, jawaban: radio5_5a, jawaban1: essaya, jawaban2: radio5_5b, jawaban3: essayb, jawaban4: radio5_5c, jawaban5: essayc, jawaban6: essayboxb_5_5d, jawaban7: radio5_5e, jawaban8: essaye, jawaban9: radio5_5f, jawaban10: essayf, jawaban11: radio5_5g, jawaban12: essayg, jawaban13: radio5_5h, jawaban14: essayh, jawaban15: radio5_5i, jawaban16: essayi, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal56*/
                const insert_detail_5_soal56 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_6, soal1: null, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, soal15: null, soal16: null, jawaban: radio5_6, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null, jawaban15: null, jawaban16: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal57*/
                const insert_detail_5_soal57 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_7, soal1: null, soal2: null, soal3: null, soal4: null, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, soal15: null, soal16: null, jawaban: radio5_7, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null, jawaban15: null, jawaban16: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 5 soal58*/
                const insert_detail_5_soal58 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_5 SET ?", [{id: null, kode_registrasi: newId, soal: soal5_8, soal1: soal5_8b, soal2: soal5_8c, soal3: soal5_8d, soal4: soal5_8e, soal5: null, soal6: null, soal7: null, soal8: null, soal9: null, soal10: null, soal11: null, soal12: null, soal13: null, soal14: null, soal15: null, soal16: null, jawaban: radio5_8a, jawaban1: radio5_8b, jawaban2: radio5_8c, jawaban3: radio5_8d, jawaban4: radio5_8e, jawaban5: null, jawaban6: null, jawaban7: null, jawaban8: null, jawaban9: null, jawaban10: null, jawaban11: null, jawaban12: null, jawaban13: null, jawaban14: null, jawaban15: null, jawaban16: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 6 soal61*/
                const insert_detail_6_soal61 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_1, jawaban: essaybox_6_1, soal1: null, jawaban1: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 6 soal62*/
                let essay6_2 = null;
                if(essayboxa_6_2){
                    essay6_2 = essayboxa_6_2
                } else if(essayboxb_6_2){
                    essay6_2 = essayboxb_6_2
                }
                const insert_detail_6_soal62 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_2, jawaban: radio6_2, soal1: soal6_2essay, jawaban1: essay6_2, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 6 soal63*/
                let essay6_3 = null;
                if(essayboxa_6_3){
                    essay6_3 = essayboxa_6_3
                } else if(essayboxb_6_3){
                    essay6_3 = essayboxb_6_3
                }
                const insert_detail_6_soal63 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_3, jawaban: radio6_3, soal1: soal6_3essay, jawaban1: essay6_3, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 6 soal64*/
                const insert_detail_6_soal64 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_4, jawaban: essaybox_6_4, soal1: null, jawaban1: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 6 soal65*/
                const insert_detail_6_soal65 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_5, jawaban: essaybox_6_5, soal1: null, jawaban1: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 6 soal66*/
                let essay6_6 = null;
                if(essayboxa_6_6){
                    essay6_6 = essayboxa_6_6
                } else if(essayboxb_6_6){
                    essay6_6 = essayboxb_6_6
                }
                const insert_detail_6_soal66 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_6, jawaban: radio6_6, soal1: soal6_6essay, jawaban1: essay6_6, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 6 soal67*/
                let essay6_7 = null;
                if(essayboxa_6_7){
                    essay6_7 = essayboxa_6_7
                } else if(essayboxb_6_7){
                    essay6_7 = essayboxb_6_7
                }
                const insert_detail_6_soal67 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_6 SET ?", [{id: null, kode_registrasi: newId, soal: soal6_7, jawaban: radio6_7, soal1: soal6_7essay, jawaban1: essay6_7, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 7 soal71*/
                const insert_detail_7_soal71 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_7 SET ?", [{id: null, kode_registrasi: newId, soal: soal7_1, jawaban: essaybox_7_1, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 7 soal72*/
                const insert_detail_7_soal72 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_7 SET ?", [{id: null, kode_registrasi: newId, soal: soal7_2, jawaban: essaybox_7_2, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 7 soal73*/
                const insert_detail_7_soal73 = await new Promise((resolve, reject) => {
                    Connection.query("INSERT INTO kb_detail_7 SET ?", [{id: null, kode_registrasi: newId, soal: soal7_3, jawaban: essaybox_7_3, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                if(insert_header === "true" && insert_detail_1_soal1 === "true" && insert_detail_1_soal2 === "true" && insert_detail_1_soal3 === "true" && insert_detail_1_soal4 === "true" && insert_detail_1_soal5 === "true" && insert_detail_1_soal6 === "true" && insert_detail_1_soal7 === "true" && insert_detail_1_soal8 === "true" && insert_detail_1_soal9 === "true" && insert_detail_1_soal10 === "true" && insert_detail_1_soal11 === "true" && insert_detail_1_soal12 === "true" && insert_detail_1_soal13 === "true" && insert_detail_1_soal14 === "true" && insert_detail_1_soal15 === "true" && insert_detail_1_soal16 === "true" && insert_detail_1_soal17 === "true" && insert_detail_2_soal21 === "true" && insert_detail_2_soal22 === "true" && insert_detail_2_soal23 === "true" && insert_detail_2_soal24 === "true" && insert_detail_2_soal25 === "true" && insert_detail_2_soal26 === "true" && insert_detail_2_soal27 === "true" && insert_detail_2_soal28 === "true" && insert_detail_3_soal31 == "true" && insert_detail_3_soal32 == "true" && insert_detail_3_soal33 == "true" && insert_detail_3_soal34 == "true" && insert_detail_4_soal41 == "true" && insert_detail_4_soal42 == "true" && insert_detail_4_soal43 == "true" && insert_detail_4_soal44 == "true" && insert_detail_4_soal45 == "true" && insert_detail_4_soal46 == "true" && insert_detail_4_soal47 == "true" && insert_detail_5_soal51 == "true" && insert_detail_5_soal52 == "true" && insert_detail_5_soal53 == "true" && insert_detail_5_soal54 == "true" && insert_detail_5_soal55 == "true" && insert_detail_5_soal56 == "true" && insert_detail_5_soal57 == "true" && insert_detail_5_soal58 == "true" && insert_detail_6_soal61 == "true" && insert_detail_6_soal62 == "true" && insert_detail_6_soal63 == "true" && insert_detail_6_soal64 == "true" && insert_detail_6_soal65 == "true" && insert_detail_6_soal66 == "true" && insert_detail_6_soal67 == "true" && insert_detail_7_soal71 == "true" && insert_detail_7_soal72 == "true" && insert_detail_7_soal73 == "true"){
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
