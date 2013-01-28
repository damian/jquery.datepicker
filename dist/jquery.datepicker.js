/*! jQuery Datepicker - v0.0.1 - 2013-01-28
* https://github.com/damian/jquery.datepicker
* Copyright (c) 2013 Damian Nicholson; Licensed MIT, GPL */

(function($, exports) {

  /**
   * @class Datepicker
   * @constructor
   *
   * @params {HtmlElement} el
   */
  var Datepicker = function(el) {
    this.$el = $(el);

    this.options = Datepicker.defaults;

    this.$template = $(this.options.template);

    this.rendered = false;

    this.setupEventHandlers();
  };

  Datepicker.defaults = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    template: '' +
      '<div class="datepicker active">' +
      '  <table>' +
      '    <thead>' +
      '      <tr>' +
      '        <th><span class="prev">&#9668;</span></th>'+
      '        <th colspan="5">' +
      '          <select id="months" name="months"></select>' +
      '          <select id="years" name="years"></select>' +
      '        </th>' +
      '        <th><span class="next">&#9658;</span></th>'+
      '      </tr>' +
      '    </thead>' +
      '  </table>' +
      '</div>'
  };

  Datepicker.prototype = {
    constructor: Datepicker,
    setupEventHandlers: function() {
      this.$el.on('focus', $.proxy(this.show, this));
      this.$el.on('blur', $.proxy(this.hide, this));
      $.datepicker.$document.on('mousedown', $.proxy(this.documentHandler, this));
    },

    documentHandler: function(ev) {
        var $target = $(ev.target),
            isDatepicker = $target.closest('.datepicker').length;

        if (!isDatepicker) {
          this.hide();
        }
    },
    show: function() {
      this.isOpen = false;
      if (this.rendered) {
        return this.$datepicker.addClass('active');
      }

      this.render();
      this.rendered = true;

      var self = this;
      this.$datepicker.on('mousedown', function(ev) {
        self.isOpen = true;
      });
    },
    hide: function(ev) {
      if (!this.isOpen) {
        this.$datepicker.removeClass('active');
      }
      this.isOpen = false;
    },
    render: function() {
      this.$template.find('#months').html(this.monthMenu());
      this.$template.find('#years').html(this.yearMenu());
      this.$datepicker = this.$template.appendTo('body');

      var offset = this.$el.offset(),
          height = offset.top + this.$el.outerHeight();

      this.$datepicker.css({
        left: offset.left,
        top: height
      });

    },
    monthMenu: function() {
      return '<option>' + this.options.months.join('</option><option>') + '</option>';
    },
    yearMenu: function() {
      var arr = [],
          count = 0,
          i = 2000;

      while(i <= 2020) {
        arr[count] = i++;
        count++;
      }

      return '<option>' + arr.join('</option><option>') + '</option>';

    },
    next: function() {
    },
    prev: function() {
    }
  };

  // Collection method.
  $.fn.datepicker = function() {
    return this.each(function() {
      var $this = $(this);
      if (!$this.data('calendar')) {
        $this.data('calendar', new Datepicker($this));
      }
    });
  };

  $.datepicker = {
    $document : $(document),
    $body : $('body')
  };

  /**
   * Expose 'Datepicker'
   */
  exports.Datepicker = Datepicker;

}(jQuery, window));
