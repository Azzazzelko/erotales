$(function() {

	var $window = $(window);
	var $document = $(document);
	var $body = $('body');
	// Custom JS

	var scrollTop = {
		visible: false,
		$toggler: $('.js-scrolltop'),
		show: function() {
			$body.addClass('-show-scrolltop');
			this.visible = true;
		},
		hide: function() {
			$body.removeClass('-show-scrolltop');
			this.visible = false;
		},
		visibilityTogger: function() {
			var st = $window.scrollTop();

			if (st > 680 && !this.visible) 
				this.show();
			else if (st <= 680 && this.visible)
				this.hide();
		},
		scrollTop: function() {
			$("html").animate({scrollTop: 0}, 500, 'swing');
		},
		init: function() {
			var _ = this;
			$window.bind('scroll', function() {_.visibilityTogger()});
			_.$toggler.on('click', function() {_.scrollTop()})
		}
	}
	scrollTop.init();

	if ($('.home-main .right-col .categories-container').length) {
		var mobileCategoriesDropdown = {
			state: false,
			$container: $('.categories-container'),
			$categoriesList: $('.categories'),
			$toggler: $('.js-toggle-categories'),
			$mainContent: $('.home-main .left-col'),
			hide: function() {
				this.$mainContent.removeAttr('style');
				this.$container.removeClass('-show-categories');
				this.state = false;
				$window.unbind('resize.closeCategories');
			},
			show: function() {
				var _ = this;
				this.$container.addClass('-show-categories');
				this.state = true;
				if (this.$categoriesList.height() > this.$mainContent.height()) {
					this.$mainContent.css('min-height', this.$categoriesList.height() + 'px');
				};
				$window.bind('resize.closeCategories', function() {
					if (window.innerWidth > 768) 
						_.hide();
				})
			},
			init: function() {
				var _ = this;
				this.$toggler.on('click', function() {
					if (_.state)
						_.hide();
					else
						_.show();
				});
			}
		};
		mobileCategoriesDropdown.init();
	};

	var mobileNav = {
		state: false,
		$nav: $('header nav'),
		$container: $body,
		$showBtn: $('.js-toggle-nav'),
		show: function() {
			var _ = this;
			this.$container.addClass('-show-nav');
			this.state = true;
			$document.bind('click.closeNavOnClickOutside', function(e) {
				if (!$(e.target).closest('header').length) {
					_.hide();
				}
			})
		},
		hide: function() {
			this.$container.removeClass('-show-nav');
			this.state = false;
			$document.unbind('click.closeNavOnClickOutside')
		},
		init: function() {
			var _ = this;
			this.$showBtn.on('click', function() {
				if (_.state)
					_.hide();
				else
					_.show();
			})
		}
	};
	mobileNav.init();

});
