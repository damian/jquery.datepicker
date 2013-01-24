describe('Datepicker', function() {
  var instance, $date;
  beforeEach(function() {
    $date = $('.date').first();
    $date.datepicker();
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
      spyOn(instance.$el, 'on').andCallThrough();
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

  describe('Show', function() {
    beforeEach(function() {
      instance.rendered = false;
      spyOn(instance, 'render').andCallThrough();
      instance.$el.trigger('focus');
    });

    it('should call the render method on the datepicker instance', function() {
      expect(instance.render).toHaveBeenCalled();
    });

    it('should set the render property to true', function() {
      expect(instance.rendered).toBeTruthy();
    });

    it('should add a class of active if the datepicker has already been rendered', function() {
      instance.rendered = true;
      spyOn(instance.$datepicker, 'addClass');
      instance.$el.trigger('focus');
      expect(instance.$datepicker.addClass).toHaveBeenCalledWith('active');
    });
  });

  describe('Hide', function() {
    beforeEach(function() {
      spyOn(instance.$datepicker, 'removeClass');
      instance.$el.trigger('blur');
    });

    it('should remove a class of active on the $datepicker', function() {
      expect(instance.$datepicker.removeClass).toHaveBeenCalledWith('active');
    });
  });
});
