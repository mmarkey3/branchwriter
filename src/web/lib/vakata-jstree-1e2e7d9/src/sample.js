// wrap in IIFE and pass jQuery as $
(function ($) {
	// some private plugin stuff if needed
	var private_var = null;

	// extending the defaults
	$.jstree.defaults.sample = {
		sample_option : 'sample_val'
	};

	// the actual plugin code
	$.jstree.plugins.sample = function (options, parent) {
		// own function
		this.sample_function = function (arg) {
			// you can chain this method if needed and available
			if(parent.sample_function) { parent.sample_function.call(this, arg); }
		};

		// *SPECIAL* FUNCTIONS
		this.init = function (el, options) {
			// do not forget parent
			parent.init.call(this, el, options);
		};
		// bind events if needed
		this.bind = function () {
			// call parent function first
			parent.bind.call(this);
			// do(stuff);
		};
		// unbind events if needed (all in jquery namespace are taken care of by the core)
		this.unbind = function () {
			// do(stuff);
			// call parent function last
			parent.unbind.call(this);
		};
		this.teardown = function () {
			// do not forget parent
			parent.teardown.call(this);
		};
		// very heavy - use only if needed and be careful (will be replaced bt redraw_node!!!)
		this.clean_node = function(obj) {
			// always get the cleaned node from the parent
			obj = parent.clean_node.call(this, obj);
			return obj.each(function () {
				// process nodes
			});
		};
		// state management - get and restore
		this.get_state = function () {
			// always get state from parent first
			var state = parent.get_state.call(this);
			// add own stuff to state
			state.sample = { 'var' : 'val' };
			return state;
		};
		this.set_state = function (state, callback) {
			// only process your part if parent returns true
			// there will be multiple times with false
			if(parent.set_state.call(state, callback)) {
				// check the key you set above
				if(state.sample) {
					// do(stuff); // like calling this.sample_function(state.sample.var);
					// remove your part of the state and RETURN FALSE, the next cycle will be TRUE
					delete state.sample;
					return false;
				}
				// return true if your state is gone (cleared in the previous step)
				return true;
			}
			// parent was false - return false too
			return false;
		};
		// node transportation
		this.get_json = function (obj, is_callback) {
			// get the node from the parent
			var r = parent.get_json.call(this, obj, is_callback);
			// only modify the node if is_callback is true
			if(is_callback) {
				r.data.sample = 'value';
			}
			// return the original / modified node
			return r;
		};
	};

	// attach to document ready if needed
	$(function () {
		// do(stuff);
	});

	// you can include the sample plugin in all instances by default
	$.jstree.defaults.plugins.push("sample");
})(jQuery);