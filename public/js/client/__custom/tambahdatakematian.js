$(document).ready(function(){
    /** show textarea */
    $("input[name$='radiopekerjaanibu']").click(function() {
        if($(this).attr('id') == 'radiok_pekerjaanibu') {
                $('#essayradiok_pekerjaanibu').show();           
        }
        else {
                $('#essayradiok_pekerjaanibu').hide();
                $('#essayboxk_pekerjaanibu').val('');
        }
    });

    $("input[name$='radiopekerjaanayah']").click(function() {
        if($(this).attr('id') == 'radiom_pekerjaanayah') {
                $('#essayradiom_pekerjaanayah').show();           
        }
        else {
                $('#essayradiom_pekerjaanayah').hide();
                $('#essayboxm_pekerjaanayah').val('');
        }
    });

    $("input[name$='ASI']").click(function() {
        if($(this).attr('id') == 'radioa_asi') {
                $('#essayradioa_asi').show();           
        }
        else {
                $('#essayradioa_asi').hide();
                $('#essayboxa_asi').val('');
        }
    });

    $("input[name$='radiopenyebabutamakematian']").click(function() {
        $('#essayradiosubm_pernafasan').hide();
        $('#essayboxm_pernafasan').val('');

        $('#essayradiogastrontestinal').hide();
        $('#essayboxl_gastrontestinal').val('');

        $('#essayradioneurologiskronis').hide();
        $('#essayboxe_neurologiskronis').val('');

        $('#essayradioneurologisakut').hide();
        $('#essayboxh_neurologisakut').val('');

        $('#essayradiohematologi').hide();
        $('#essayboxg_hematologi').val('');

        $('#essayradiokanker').hide();
        $('#essayboxh_kanker').val('');
    });

    $("input[name$='radiosubpernafasan']").click(function() {
        if($(this).attr('id') == 'radiosubm_pernafasan') {
                $('#essayradiosubm_pernafasan').show();           
        }
        else {
                $('#essayradiosubm_pernafasan').hide();
                $('#essayboxm_pernafasan').val('');
        }
    });

    $("input[name$='radiosubgastrontestinal']").click(function() {
        if($(this).attr('id') == 'radiosubl_gastrontestinal') {
                $('#essayradiogastrontestinal').show();           
        }
        else {
                $('#essayradiogastrontestinal').hide();
                $('#essayboxl_gastrontestinal').val('');
        }
    });

    $("input[name$='radiosubneurologiskronis']").click(function() {
        if($(this).attr('id') == 'radiosube_neurologiskronis') {
                $('#essayradioneurologiskronis').show();           
        }
        else {
                $('#essayradioneurologiskronis').hide();
                $('#essayboxe_neurologiskronis').val('');
        }
    });

    $("input[name$='radiosubneurologisakut']").click(function() {
        if($(this).attr('id') == 'radiosubh_neurologisakut') {
                $('#essayradioneurologisakut').show();           
        }
        else {
                $('#essayradioneurologisakut').hide();
                $('#essayboxh_neurologisakut').val('');
        }
    });

    $("input[name$='radiosubhematologi']").click(function() {
        if($(this).attr('id') == 'radiosubg_hematologi') {
                $('#essayradiohematologi').show();           
        }
        else {
                $('#essayradiohematologi').hide();
                $('#essayboxg_hematologi').val('');
        }
    });

    $("input[name$='radiosubkanker']").click(function() {
        if($(this).attr('id') == 'radiosubh_kanker') {
                $('#essayradiokanker').show();           
        }
        else {
                $('#essayradiokanker').hide();
                $('#essayboxh_kanker').val('');
        }
    });

    $("input[name$='radiokondisikronis']").click(function() {
        if($(this).attr('id') == 'radiok_kondisikronis') {
                $('#essaykondisikronis').show();           
        }
        else {
                $('#essaykondisikronis').hide();
                $('#essayboxk_kondisikronis').val('');
        }
    });

    $("input[name$='radio5_1']").click(function() {
        if($(this).attr('id') == 'radiol_5_1') {
                $('#essay5_1').show();           
        }
        else {
                $('#essay5_1').hide();
                $('#essayboxl_5_1').val('');
        }
    });

    $("input[name$='radio5_2']").click(function() {
        if($(this).attr('id') == 'radioi_5_2') {
                $('#essay5_2').show();           
        }
        else {
                $('#essay5_2').hide();
                $('#essayboxi_5_2').val('');
        }
    });

    $("input[name$='radio5_3c']").click(function() {
        if($(this).attr('id') == 'radiob_5_3c') {
                $('#essay5_3c').show();           
        }
        else {
                $('#essay5_3c').hide();
                $('#essayboxb_5_3c').val('');
        }
    });

    $("input[name$='radio5_5a']").click(function() {
        if($(this).attr('id') == 'radioa_5_5a') {
                $('#essaya5_5a').show();           
        }
        else {
                $('#essaya5_5a').hide();
                $('#essayboxa_5_5a').val('');
        }
    });

    $("input[name$='radio5_5a']").click(function() {
        if($(this).attr('id') == 'radiob_5_5a') {
                $('#essayb5_5a').show();           
        }
        else {
                $('#essayb5_5a').hide();
                $('#essayboxb_5_5a').val('');
        }
    });

    $("input[name$='radio5_5b']").click(function() {
        if($(this).attr('id') == 'radioa_5_5b') {
                $('#essaya5_5b').show();           
        }
        else {
                $('#essaya5_5b').hide();
                $('#essayboxa_5_5b').val('');
        }
    });

    $("input[name$='radio5_5b']").click(function() {
        if($(this).attr('id') == 'radiob_5_5b') {
                $('#essayb5_5b').show();           
        }
        else {
                $('#essayb5_5b').hide();
                $('#essayboxb_5_5b').val('');
        }
    });

    $("input[name$='radio5_5c']").click(function() {
        if($(this).attr('id') == 'radioa_5_5c') {
                $('#essaya5_5c').show();           
        }
        else {
                $('#essaya5_5c').hide();
                $('#essayboxa_5_5c').val('');
        }
    });

    $("input[name$='radio5_5c']").click(function() {
        if($(this).attr('id') == 'radiob_5_5c') {
                $('#essayb5_5c').show();           
        }
        else {
                $('#essayb5_5c').hide();
                $('#essayboxb_5_5c').val('');
        }
    });

    $("input[name$='radio5_5e']").click(function() {
        if($(this).attr('id') == 'radioa_5_5e') {
                $('#essaya5_5e').show();           
        }
        else {
                $('#essaya5_5e').hide();
                $('#essayboxa_5_5e').val('');
        }
    });

    $("input[name$='radio5_5e']").click(function() {
        if($(this).attr('id') == 'radiob_5_5e') {
                $('#essayb5_5e').show();           
        }
        else {
                $('#essayb5_5e').hide();
                $('#essayboxb_5_5e').val('');
        }
    });

    $("input[name$='radio5_5f']").click(function() {
        if($(this).attr('id') == 'radioa_5_5f') {
                $('#essaya5_5f').show();           
        }
        else {
                $('#essaya5_5f').hide();
                $('#essayboxa_5_5f').val('');
        }
    });

    $("input[name$='radio5_5f']").click(function() {
        if($(this).attr('id') == 'radiob_5_5f') {
                $('#essayb5_5f').show();           
        }
        else {
                $('#essayb5_5f').hide();
                $('#essayboxb_5_5f').val('');
        }
    });

    $("input[name$='radio5_5g']").click(function() {
        if($(this).attr('id') == 'radioa_5_5g') {
                $('#essaya5_5g').show();           
        }
        else {
                $('#essaya5_5g').hide();
                $('#essayboxa_5_5g').val('');
        }
    });

    $("input[name$='radio5_5g']").click(function() {
        if($(this).attr('id') == 'radiob_5_5g') {
                $('#essayb5_5g').show();           
        }
        else {
                $('#essayb5_5g').hide();
                $('#essayboxb_5_5g').val('');
        }
    });

    $("input[name$='radio5_5h']").click(function() {
        if($(this).attr('id') == 'radioa_5_5h') {
                $('#essaya5_5h').show();           
        }
        else {
                $('#essaya5_5h').hide();
                $('#essayboxa_5_5h').val('');
        }
    });

    $("input[name$='radio5_5h']").click(function() {
        if($(this).attr('id') == 'radiob_5_5h') {
                $('#essayb5_5h').show();           
        }
        else {
                $('#essayb5_5h').hide();
                $('#essayboxb_5_5h').val('');
        }
    });

    $("input[name$='radio5_5i']").click(function() {
        if($(this).attr('id') == 'radioa_5_5i') {
                $('#essaya5_5i').show();           
        }
        else {
                $('#essaya5_5i').hide();
                $('#essayboxa_5_5i').val('');
        }
    });

    $("input[name$='radio5_5i']").click(function() {
        if($(this).attr('id') == 'radiob_5_5i') {
                $('#essayb5_5i').show();           
        }
        else {
                $('#essayb5_5i').hide();
                $('#essayboxb_5_5i').val('');
        }
    });

    $("input[name$='radio6_2']").click(function() {
        if($(this).attr('id') == 'radioa_6_2') {
                $('#essaya6_2').show();           
        }
        else {
                $('#essaya6_2').hide();
                $('#essayboxa_6_2').val('');
        }
    });

    $("input[name$='radio6_2']").click(function() {
        if($(this).attr('id') == 'radiob_6_2') {
                $('#essayb6_2').show();           
        }
        else {
                $('#essayb6_2').hide();
                $('#essayboxb_6_2').val('');
        }
    });

    $("input[name$='radio6_3']").click(function() {
        if($(this).attr('id') == 'radioa_6_3') {
                $('#essaya6_3').show();           
        }
        else {
                $('#essaya6_3').hide();
                $('#essayboxa_6_3').val('');
        }
    });

    $("input[name$='radio6_3']").click(function() {
        if($(this).attr('id') == 'radiob_6_3') {
                $('#essayb6_3').show();           
        }
        else {
                $('#essayb6_3').hide();
                $('#essayboxb_6_3').val('');
        }
    });

    $("input[name$='radio6_6']").click(function() {
        if($(this).attr('id') == 'radioa_6_6') {
                $('#essaya6_6').show();           
        }
        else {
                $('#essaya6_6').hide();
                $('#essayboxa_6_6').val('');
        }
    });

    $("input[name$='radio6_6']").click(function() {
        if($(this).attr('id') == 'radiob_6_6') {
                $('#essayb6_6').show();           
        }
        else {
                $('#essayb6_6').hide();
                $('#essayboxb_6_6').val('');
        }
    });

    $("input[name$='radio6_7']").click(function() {
        if($(this).attr('id') == 'radioa_6_7') {
                $('#essaya6_7').show();           
        }
        else {
                $('#essaya6_7').hide();
                $('#essayboxa_6_7').val('');
        }
    });

    $("input[name$='radio6_7']").click(function() {
        if($(this).attr('id') == 'radiob_6_7') {
                $('#essayb6_7').show();           
        }
        else {
                $('#essayb6_7').hide();
                $('#essayboxb_6_7').val('');
        }
    });





    /** show sub jawaban */
    var namasub1 = "radiosubcarapersalinan";
    $("input[name$='radiocarapersalinan']").click(function() {
        if($(this).attr('id') == 'radiod_carapersalinan') {
                $('#subradiod_carapersalinan').show();           
        }
        else {
                $('#subradiod_carapersalinan').hide();
                $('input[name='+namasub1+']').prop('checked', false);
        }
    });

    var namasub2 = "radiosubasi";
    $("input[name$='ASI']").click(function() {
        if($(this).attr('id') == 'radiob_asi') {
                $('#subradiob_asi').show();           
        }
        else {
                $('#subradiob_asi').hide();
                $('input[name='+namasub2+']').prop('checked', false);
        }
    });

//     var classpemberianimunisasi = "radiosubpemberianimunisasi";
//     $("input[name$='radiopemberianimunisasi']").click(function() {
//         if($(this).attr('id') == 'radiob_pemberianimunisasi') {
//                 $('#subradiob_pemberianimunisasi').show();           
//         }
//         else {
//                 $('#subradiob_pemberianimunisasi').hide();
//                 $('input[class='+classpemberianimunisasi+']').prop('checked', false);
//         }
//     });

    var classpemberianimunisasi = "radiosubpemberianimunisasi";
    var radiosubpemberianimunisasi_a = "radiosubpemberianimunisasi_a";
    var radiosubpemberianimunisasi_b = "radiosubpemberianimunisasi_b";
    var radiosubpemberianimunisasi_c = "radiosubpemberianimunisasi_c";
    var radiosubpemberianimunisasi_d = "radiosubpemberianimunisasi_d";
    var radiosubpemberianimunisasi_e = "radiosubpemberianimunisasi_e";
    var radiosubpemberianimunisasi_f = "radiosubpemberianimunisasi_f";
    var radiosubpemberianimunisasi_g = "radiosubpemberianimunisasi_g";
    $("input[name$='radiopemberianimunisasi']").click(function() {
        if($(this).attr('id') == 'radiob_pemberianimunisasi') {
                $('#subradiob_pemberianimunisasi').show();

                $('#subradiob_pemberianimunisasi_a').show();
                $('#subradiob_pemberianimunisasi_b').show();
                $('#subradiob_pemberianimunisasi_c').show();
                $('#subradiob_pemberianimunisasi_d').show();
                $('#subradiob_pemberianimunisasi_e').show();
                $('#subradiob_pemberianimunisasi_f').show();
                $('#subradiob_pemberianimunisasi_g').show();
        }
        else {
                $('#subradiob_pemberianimunisasi').hide();
                $('input[class='+classpemberianimunisasi+']').prop('checked', false);
                
                $('#subradiob_pemberianimunisasi_a').hide();
                $('input[name='+radiosubpemberianimunisasi_a+']').prop('checked', false);
                $('#subradiob_pemberianimunisasi_b').hide();
                $('input[name='+radiosubpemberianimunisasi_b+']').prop('checked', false);
                $('#subradiob_pemberianimunisasi_c').hide();
                $('input[name='+radiosubpemberianimunisasi_c+']').prop('checked', false);
                $('#subradiob_pemberianimunisasi_d').hide();
                $('input[name='+radiosubpemberianimunisasi_d+']').prop('checked', false);
                $('#subradiob_pemberianimunisasi_e').hide();
                $('input[name='+radiosubpemberianimunisasi_e+']').prop('checked', false);
                $('#subradiob_pemberianimunisasi_f').hide();
                $('input[name='+radiosubpemberianimunisasi_f+']').prop('checked', false);
                $('#subradiob_pemberianimunisasi_g').hide();
                $('input[name='+radiosubpemberianimunisasi_g+']').prop('checked', false);
        }
    });


    var namasubPernafasan = "radiosubpernafasan";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radioa_penyebabutamakematian') {
                $('#subradio_pernafasan').show();           
        }
        else {
                $('#subradio_pernafasan').hide();
                $('input[name='+namasubPernafasan+']').prop('checked', false);
        }
    });

    var namasubGastrontestinal = "radiosubgastrontestinal";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radiob_penyebabutamakematian') {
                $('#subradio_gastrontestinal').show();           
        }
        else {
                $('#subradio_gastrontestinal').hide();
                $('input[name='+namasubGastrontestinal+']').prop('checked', false);
        }
    });

    var namasubGizi = "radiosubgizi";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radioc_penyebabutamakematian') {
                $('#subradio_gizi').show();           
        }
        else {
                $('#subradio_gizi').hide();
                $('input[name='+namasubGizi+']').prop('checked', false);
        }
    });

    var namasubMalaria = "radiosubmalaria";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radiod_penyebabutamakematian') {
                $('#subradio_malaria').show();           
        }
        else {
                $('#subradio_malaria').hide();
                $('input[name='+namasubMalaria+']').prop('checked', false);
        }
    });

    var namasubNeurologiskronis = "radiosubneurologiskronis";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radioe_penyebabutamakematian') {
                $('#subradio_neurologiskronis').show();           
        }
        else {
                $('#subradio_neurologiskronis').hide();
                $('input[name='+namasubNeurologiskronis+']').prop('checked', false);
        }
    });

    var namasubNeurologisakut = "radiosubneurologisakut";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radiof_penyebabutamakematian') {
                $('#subradio_neurologisakut').show();           
        }
        else {
                $('#subradio_neurologisakut').hide();
                $('input[name='+namasubNeurologisakut+']').prop('checked', false);
        }
    });

    var namasubTuberkulosis = "radiosubtuberkulosis";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radiog_penyebabutamakematian') {
                $('#subradio_tuberkulosis').show();           
        }
        else {
                $('#subradio_tuberkulosis').hide();
                $('input[name='+namasubTuberkulosis+']').prop('checked', false);
        }
    });

    var namasubRuamdandemam = "radiosubruamdandemam";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radioh_penyebabutamakematian') {
                $('#subradio_ruamdandemam').show();           
        }
        else {
                $('#subradio_ruamdandemam').hide();
                $('input[name='+namasubRuamdandemam+']').prop('checked', false);
        }
    });

    var namasubHiv = "radiosubhiv";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radioi_penyebabutamakematian') {
                $('#subradio_hiv').show();           
        }
        else {
                $('#subradio_hiv').hide();
                $('input[name='+namasubHiv+']').prop('checked', false);
        }
    });

    var namasubHiv = "radiosubdaruratbedah";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radioj_penyebabutamakematian') {
                $('#subradio_daruratbedah').show();           
        }
        else {
                $('#subradio_daruratbedah').hide();
                $('input[name='+namasubHiv+']').prop('checked', false);
        }
    });

    var namasubGinjal = "radiosubginjal";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radiok_penyebabutamakematian') {
                $('#subradio_ginjal').show();           
        }
        else {
                $('#subradio_ginjal').hide();
                $('input[name='+namasubGinjal+']').prop('checked', false);
        }
    });

    var namasubKelenjarendokrin = "radiosubkelenjarendokrin";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radiol_penyebabutamakematian') {
                $('#subradio_kelenjarendokrin').show();           
        }
        else {
                $('#subradio_kelenjarendokrin').hide();
                $('input[name='+namasubKelenjarendokrin+']').prop('checked', false);
        }
    });

    var namasubHematologi = "radiosubhematologi";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radiom_penyebabutamakematian') {
                $('#subradio_hematologi').show();           
        }
        else {
                $('#subradio_hematologi').hide();
                $('input[name='+namasubHematologi+']').prop('checked', false);
        }
    });

    var namasubJantung = "radiosubjantung";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radion_penyebabutamakematian') {
                $('#subradio_jantung').show();           
        }
        else {
                $('#subradio_jantung').hide();
                $('input[name='+namasubJantung+']').prop('checked', false);
        }
    });

    var namasubKanker = "radiosubkanker";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radioo_penyebabutamakematian') {
                $('#subradio_kanker').show();           
        }
        else {
                $('#subradio_kanker').hide();
                $('input[name='+namasubKanker+']').prop('checked', false);
        }
    });

    var namasubPerlindunganbalita = "radiosubperlindunganbalita";
    $("input[name$='radiopenyebabutamakematian']").click(function() {
        if($(this).attr('id') == 'radiop_penyebabutamakematian') {
                $('#subradio_perlindunganbalita').show();           
        }
        else {
                $('#subradio_perlindunganbalita').hide();
                $('input[name='+namasubPerlindunganbalita+']').prop('checked', false);
        }
    });

    var namasubBblr = "radiosubbblr";
    $("input[name$='radioriwayatbalita']").click(function() {
        if($(this).attr('id') == 'radioa_riwayatbalita') {
                $('#subradio_bblr').show();           
        }
        else {
                $('#subradio_bblr').hide();
                $('input[name='+namasubBblr+']').prop('checked', false);
        }
    });

    var namasubInfeksineonatal = "radiosubinfeksineonatal";
    $("input[name$='radioriwayatbalita']").click(function() {
        if($(this).attr('id') == 'radioc_riwayatbalita') {
                $('#subradio_infeksineonatal').show();           
        }
        else {
                $('#subradio_infeksineonatal').hide();
                $('input[name='+namasubInfeksineonatal+']').prop('checked', false);
        }
    });

    var namasubKondisiperinatal = "radiosubkondisiperinatal";
    $("input[name$='radioriwayatbalita']").click(function() {
        if($(this).attr('id') == 'radiod_riwayatbalita') {
                $('#subradio_kondisiperinatal').show();           
        }
        else {
                $('#subradio_kondisiperinatal').hide();
                $('input[name='+namasubKondisiperinatal+']').prop('checked', false);
        }
    });

    var namasubMalformasicongenital = "radiosubmalformasicongenital";
    $("input[name$='radioriwayatbalita']").click(function() {
        if($(this).attr('id') == 'radioe_riwayatbalita') {
                $('#subradio_malformasicongenital').show();           
        }
        else {
                $('#subradio_malformasicongenital').hide();
                $('input[name='+namasubMalformasicongenital+']').prop('checked', false);
        }
    });

    /**
    var nama = 'radio'+{{id}}
    var namasub = 'radiosub'+{{id}}
    $("input[name$='"+nama+"']").click(function() {
        var inputValue = $(this).attr("id");
        $("div.boxc").hide();
        $('input[name='+namasub+']').prop('checked', false);

        var add = '#sub'+inputValue
        $(add).show();
        $('input[name='+namasub+']').setAttribute("required","required");
    });
    */

    /** fungsi kalkulasi umur */
    function getAge(dateString) {
        var now = new Date();
        var today = new Date(now.getYear(),now.getMonth(),now.getDate());
        
        var yearNow = now.getYear();
        var monthNow = now.getMonth();
        var dateNow = now.getDate();
        
        /*  var dob = new Date(dateString.substring(6,10),
                            dateString.substring(0,2)-1,                   
                            dateString.substring(3,5)                  
                            ); */
                            
        var dob = new Date(dateString.substring(0,4),
                            dateString.substring(5,7)-1,                   
                            dateString.substring(8,10)                  
                            );
        
        var yearDob = dob.getYear();
        var monthDob = dob.getMonth();
        var dateDob = dob.getDate();
        var age = {};
        var ageString = "";
        var yearString = "";
        var monthString = "";
        var dayString = "";
        
        
        yearAge = yearNow - yearDob;
        
        if (monthNow >= monthDob)
            var monthAge = monthNow - monthDob;
        else {
            yearAge--;
            var monthAge = 12 + monthNow -monthDob;
        }
        
        if (dateNow >= dateDob)
            var dateAge = dateNow - dateDob;
        else {
            monthAge--;
            var dateAge = 31 + dateNow - dateDob;
        
            if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
            }
        }
        
        age = {
            years: yearAge,
            months: monthAge,
            days: dateAge
            };

        if ( age.years > 1 ) yearString = " tahun";
        else yearString = " tahun";
        if ( age.months> 1 ) monthString = " bulan";
        else monthString = " bulan";
        if ( age.days > 1 ) dayString = " hari";
        else dayString = " hari";
        
        
        if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )
            ageString = age.years + yearString + ", " + age.months + monthString + ", " + age.days + dayString;
        else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
            ageString = age.days + dayString ;
        else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
            ageString = age.years + yearString;
        else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
            ageString = age.years + yearString + ", " + age.months + monthString;
        else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
            ageString = age.months + monthString + ", " + age.days + dayString;
        else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
            ageString = age.years + yearString + ", " + age.days + dayString;
        else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
            ageString = age.months + monthString;
        else ageString = "Oops, tidak dapat melakukan kalkulasi umur!";
        
        return ageString;
        }
        
        /* alert(getAge('11/12/2020')); */
        // alert(getAge('2020/11/12'));

    document.getElementById("tanggallahir").onchange = function() {myFunction()};

    function myFunction() {
        var harilahir = document.getElementById("tanggallahir").value;
        document.getElementById("umurbalita").value = getAge(harilahir);
    }

    /** fungsi kalkulasi umur ketika kematian */
    function getAge2(dateString2) {
        /**
        var now = new Date();
        var today = new Date(now.getYear(),now.getMonth(),now.getDate());

        var yearNow = now.getYear();
        var monthNow = now.getMonth();
        var dateNow = now.getDate();
        */

        var harilahir = document.getElementById("tanggallahir").value;
        
        var lahir = new Date(harilahir.substring(0,4),
                        harilahir.substring(5,7)-1,
                        harilahir.substring(8,10));
        
        var yearLahir = lahir.getYear();
        var monthLahir = lahir.getMonth();
        var dateLahir = lahir.getDate();
                            
        var kematian = new Date(dateString2.substring(0,4),
                            dateString2.substring(5,7)-1,                   
                            dateString2.substring(8,10)                  
                            );
        
        var yearKematian = kematian.getYear();
        var monthKematian = kematian.getMonth();
        var dateKematian = kematian.getDate();
        var age = {};
        var ageString = "";
        var yearString = "";
        var monthString = "";
        var dayString = "";
        
        
        yearAge = yearKematian - yearLahir;
        
        if (monthKematian >= monthLahir)
            var monthAge = monthKematian - monthLahir;
        else {
            yearAge--;
            var monthAge = 12 + monthKematian -monthLahir;
        }
        
        if (dateKematian >= dateLahir)
            var dateAge = dateKematian - dateLahir;
        else {
            monthAge--;
            var dateAge = 31 + dateKematian - dateLahir;
        
            if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
            }
        }
        
        age = {
            years: yearAge,
            months: monthAge,
            days: dateAge
            };

        if ( age.years > 1 ) yearString = " tahun";
        else yearString = " tahun";
        if ( age.months> 1 ) monthString = " bulan";
        else monthString = " bulan";
        if ( age.days > 1 ) dayString = " hari";
        else dayString = " hari";
        
        
        if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )
            ageString = age.years + yearString + ", " + age.months + monthString + ", " + age.days + dayString;
        else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
            ageString = age.days + dayString ;
        else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
            ageString = age.years + yearString;
        else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
            ageString = age.years + yearString + ", " + age.months + monthString;
        else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
            ageString = age.months + monthString + ", " + age.days + dayString;
        else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
            ageString = age.years + yearString + ", " + age.days + dayString;
        else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
            ageString = age.months + monthString;
        else ageString = "Oops, tidak dapat melakukan kalkulasi umur!";
        
        return ageString;
        }
        
        /* alert(getAge('11/12/2020')); */
        // alert(getAge('2020/11/12'));

    document.getElementById("tanggalkematian").onchange = function() {myFunction2()};

    function myFunction2() {
        var harikematian = document.getElementById("tanggalkematian").value;
        document.getElementById("jawabanusiameninggal").value = getAge2(harikematian);
    }
});