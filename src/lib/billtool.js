var $builtinmodule = function(name) {
    console.log("billtool.js builtinmodule", {name});
    var mod = {};
    function myfact(n) {
        console.log("myfact called with " + n);
        if(n < 1) {
            return 1;
        } else {
            return n * myfact(n-1);
        }
    }
    mod.fact = new Sk.builtin.func(function(a) {
        console.log("billtools builtin.func", a);
        return myfact(a.v);  // extract the underlying JS value with .v
    });

    mod.Stack = Sk.misceval.buildClass(mod, function($gbl, $loc) {
        console.log("billtools buildClass Stack class", $gbl, $loc);

        $loc.__init__ = new Sk.builtin.func(function(self) {
            console.log("billtools buildClass Stack __init__", self);
            self.stack = [];
        });
        $loc.push = new Sk.builtin.func(function(self,x) {
            console.log("billtools buildClass Stack push", self, x);
            self.stack.push(x);
        });
        $loc.pop = new Sk.builtin.func(function(self) {
            console.log("billtools buildClass Stack pop", self);
            return self.stack.pop();
        });
    }, "Stack", []);

    return mod;
};
