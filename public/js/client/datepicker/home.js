// Date Picker
jQuery('.mydatepicker, #datepicker').datepicker({
    format: 'yyyy-mm-dd'
});
jQuery('#datepicker-autoclose').datepicker({
    autoclose: true,
    todayHighlight: true
});
jQuery('#date-range').datepicker({
    toggleActive: true,
    format: 'yyyy-mm-dd'
});
jQuery('#datepicker-inline').datepicker({
    todayHighlight: true
});