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

    $("input[name$='radiosubgizi']").click(function() {
        if($(this).attr('id') == 'radiosubg_gizi') {
                $('#essayradiogizi').show();           
        }
        else {
                $('#essayradiogizi').hide();
                $('#essayboxg_gizi').val('');
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