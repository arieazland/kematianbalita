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
    const { iduser, jawabannamabalita, umurbalita, tanggallahir, radiojeniskelamin, balitake, jumlahbalitadilahirkanhidup, jawabannamaibu, jawabanumuribu, radiopekerjaanibu, essayboxk_pekerjaanibu, radiopendidikanibu, jawabannamaayah, jawabanumurayah, radiopekerjaanayah, essayboxm_pekerjaanayah, radiopendidikanayah, jawabanalamat, jawabantelephone, jawabanpenghasilan, jawabanberatbadanbalita, jawabanberatbadansaatini, jawabantinggibadan, radiocarapersalinan, radiosubcarapersalinan, jawabanusiakehamilansaatlahir, ASIIMD, ASI, essayboxa_asi, radiosubasi, radiostatusnutrisi, radiopemberianimunisasi, radiosubpemberianimunisasi_a, radiosubpemberianimunisasi_b, radiosubpemberianimunisasi_c, radiosubpemberianimunisasi_d, radiosubpemberianimunisasi_e, radiosubpemberianimunisasi_f, radiosubpemberianimunisasi_g, } = req.body;
    var tanggal = Moment().format("YYYY-MM-DD");
    var waktu = Moment().format("HH:mm:ss");
    var tglreg = Moment().format("YYYYMMDD");
    if(iduser){
        try{
            const carichar = '%REG-'+ tglreg + '-%';
            const char = 'REG-'+ tglreg + '-';

            /** pengambilan nilai paling besar di kode registrasi */
            const cek_max_reg = await new Promise((resolve, reject) => {
                const sql = Connection.query("SELECT max(SUBSTRING(kode_registrasi, 14, 4)) as max_id FROM kb_header WHERE kode_registrasi LIKE ? ORDER BY kode_registrasi DESC LIMIT 1", [carichar], (error, results) => {
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
                    const sql = Connection.query("INSERT INTO kb_header SET ?", [{id: null, kode_registrasi: newId, nama_balita: jawabannamabalita, tanggal_lahir_balita: tanggallahir, nama_ibu: jawabannamaibu, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal 1*/
                const insert_detail_1_soal1 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: jawabannamabalita, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal2*/
                const insert_detail_1_soal2 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: umurbalita, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal3*/
                const insert_detail_1_soal3 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: tanggallahir, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal4*/
                const insert_detail_1_soal4 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: radiojeniskelamin, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal5*/
                const insert_detail_1_soal5 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: balitake, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal6*/
                const insert_detail_1_soal6 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: jumlahbalitadilahirkanhidup, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal7*/
                const insert_detail_1_soal7 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: jawabannamaibu, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal8*/
                const insert_detail_1_soal8 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: jawabanumuribu, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal9*/
                const insert_detail_1_soal9 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: radiopekerjaanibu, essay_jawaban: essayboxk_pekerjaanibu, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal10*/
                const insert_detail_1_soal10 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: radiopendidikanibu, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal11*/
                const insert_detail_1_soal11 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: jawabannamaayah, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal12*/
                const insert_detail_1_soal12 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: jawabanumurayah, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal13*/
                const insert_detail_1_soal13 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: radiopekerjaanayah, essay_jawaban: essayboxm_pekerjaanayah, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal14*/
                const insert_detail_1_soal14 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: radiopendidikanayah, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal15*/
                const insert_detail_1_soal15 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: jawabanalamat, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal16*/
                const insert_detail_1_soal16 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: jawabantelephone, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })
                /** insert detail 1 soal17*/
                const insert_detail_1_soal17 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_1 SET ?", [{id: null, kode_registrasi: newId, jawaban: jawabanpenghasilan, essay_jawaban: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal21*/
                const insert_detail_2_soal21 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, jawaban: jawabanberatbadanbalita, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal22*/
                const insert_detail_2_soal22 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, jawaban: jawabanberatbadansaatini, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal23*/
                const insert_detail_2_soal23 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, jawaban: jawabantinggibadan, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal24*/
                const insert_detail_2_soal24 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, jawaban: radiocarapersalinan, jawaban1: radiosubcarapersalinan, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal25*/
                const insert_detail_2_soal25 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, jawaban: jawabanusiakehamilansaatlahir, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal26*/
                let isi_jawaban2 = null;
                if(!radiosubasi && essayboxa_asi) {
                    isi_jawaban2 = essayboxa_asi;
                } else if(!essayboxa_asi && radiosubasi){
                    isi_jawaban2 = radiosubasi;
                }
                console.log(isi_jawaban2);

                const insert_detail_2_soal26 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, jawaban: ASIIMD, jawaban1: ASI, jawaban2: isi_jawaban2, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal27*/
                const insert_detail_2_soal27 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, jawaban: radiostatusnutrisi, jawaban1: null, jawaban2: null, jawaban3: null, jawaban4: null, jawaban5: null, jawaban6: null, jawaban7: null, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                /** insert detail 2 soal28*/
                const insert_detail_2_soal28 = await new Promise((resolve, reject) => {
                    const sql = Connection.query("INSERT INTO kb_detail_2 SET ?", [{id: null, kode_registrasi: newId, jawaban: radiopemberianimunisasi, jawaban1: radiosubpemberianimunisasi_a, jawaban2: radiosubpemberianimunisasi_b, jawaban3: radiosubpemberianimunisasi_c, jawaban4: radiosubpemberianimunisasi_d, jawaban5: radiosubpemberianimunisasi_e, jawaban6: radiosubpemberianimunisasi_f, jawaban7: radiosubpemberianimunisasi_g, date_created: tanggal, date_updated: null, time_created: waktu, time_updated: null}], (error) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve("true")
                        }
                    })
                })

                if(insert_header === "true" && insert_detail_1_soal1 === "true" && insert_detail_1_soal2 === "true" && insert_detail_1_soal3 === "true" && insert_detail_1_soal4 === "true" && insert_detail_1_soal5 === "true" && insert_detail_1_soal6 === "true" && insert_detail_1_soal7 === "true" && insert_detail_1_soal8 === "true" && insert_detail_1_soal9 === "true" && insert_detail_1_soal10 === "true" && insert_detail_1_soal11 === "true" && insert_detail_1_soal12 === "true" && insert_detail_1_soal13 === "true" && insert_detail_1_soal14 === "true" && insert_detail_1_soal15 === "true" && insert_detail_1_soal16 === "true" && insert_detail_1_soal17 === "true"){
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
