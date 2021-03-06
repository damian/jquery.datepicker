describe('Datepicker', function() {
  var instance, $date;
  beforeEach(function() {
    $date = $('.date').first();
    if (!$date.data('calendar')) {
      $date.datepicker();
    }
    instance = $date.data('calendar');
  });

  describe("Constructor", function() {
    it('should create an instance of Datepicker', function() {
      expect(instance instanceof Datepicker).toBeTruthy();
    });

    it('should have a property of $el which is the field it is initialised on', function() {
      expect(instance.$el instanceof jQuery).toBeTruthy();
    });

    it('should have a property of options which contains the Datepicker defaults', function() {
      expect(instance.options).toBe(Datepicker.defaults);
    });

    it('should have a property of $template which is a jQuery version of the template defined in options', function() {
      expect(instance.$template instanceof jQuery).toBeTruthy();
    });

    it('should have a property of rendered which defaults to false', function() {
      expect(instance.rendered).toBeFalsy();
    });
  });

  describe('Event handlers', function() {
    beforeEach(function() {
      spyOn(instance.$el, 'on');
      instance.setupEventHandlers();
    });

    describe('on focus', function() {
      it('should setup an on focus event on the input', function() {
        expect(instance.$el.on.argsForCall[0][0]).toBe('focus');
      });

      it('should pass a callback function as an argument to the focus event', function() {
        expect(instance.$el.on.argsForCall[0][1] instanceof Function).toBeTruthy();
      });
    });

    describe('on blur', function() {
      it('should setup an on blur event on the input', function() {
        expect(instance.$el.on.argsForCall[1][0]).toBe('blur');
      });

      it('should pass a callback function as an argument to the blur event', function() {
        expect(instance.$el.on.argsForCall[1][1] instanceof Function).toBeTruthy();
      });
    });
  });

  describe('Render', function() {
    beforeEach(function() {
      spyOn($.fn, 'html').andCallThrough();
      spyOn(instance, 'monthMenu').andCallThrough();
      spyOn(instance, 'yearMenu').andCallThrough();
      spyOn(instance.$template, 'appendTo').andCallThrough();
      instance.render();
    });

    it('should set the HTML of both the months and years dropdown', function() {
      expect($.fn.html.callCount).toBe(2);
    });

    it('should call the monthMenu method', function() {
      expect(instance.monthMenu).toHaveBeenCalled();
    });

    it('should call the yearMenu method', function() {
      expect(instance.yearMenu).toHaveBeenCalled();
    });

    it('should append a datepicker to the body', function() {
      expect(instance.$template.appendTo).toHaveBeenCalledWith('body');
    });

    it('should define a property of $datepicker', function() {
      expect(instance.$datepicker).toBeDefined();
    });
  });

  describe('Show', function() {
    beforeEach(function() {
      instance.rendered = false;
      spyOn(instance, 'render').andCallThrough();
      instance.$el.trigger('focus');
    });

    describe('if the datepicker is not already rendered', function() {
      it('should call the render method on the datepicker instance', function() {
        expect(instance.render).toHaveBeenCalled();
      });

      it('should set the render property to true', function() {
        expect(instance.rendered).toBeTruthy();
      });
    });

    describe('if the datepicker is already rendered', function() {
      beforeEach(function() {
        instance.rendered = true;
        spyOn(instance.$datepicker, 'addClass');
        instance.$el.trigger('focus');
      });

      it('should add a class of active if the datepicker has already been rendered', function() {
        expect(instance.$datepicker.addClass).toHaveBeenCalledWith('active');
      });
    });
  });

  describe('Hide', function() {
    beforeEach(function() {
      spyOn(instance.$datepicker, 'removeClass').andCallThrough();
      instance.$el.trigger('blur');
    });

    it('should remove a class of active on the $datepicker', function() {
      expect(instance.$datepicker.removeClass).toHaveBeenCalledWith('active');
    });
  });
});
