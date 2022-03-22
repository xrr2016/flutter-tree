var CanvasKitInit = (function () {
  var _scriptDir =
    typeof document !== "undefined" && document.currentScript
      ? document.currentScript.src
      : undefined;
  if (typeof __filename !== "undefined") _scriptDir = _scriptDir || __filename;
  return function (CanvasKitInit) {
    CanvasKitInit = CanvasKitInit || {};

    null;
    var g;
    g || (g = typeof CanvasKitInit !== "undefined" ? CanvasKitInit : {});
    var aa;
    g.ready = new Promise(function (a) {
      aa = a;
    });
    (function (a) {
      a.yk = a.yk || [];
      a.yk.push(function () {
        a.MakeSWCanvasSurface = function (b) {
          var c = b;
          if ("CANVAS" !== c.tagName && ((c = document.getElementById(b)), !c))
            throw "Canvas with id " + b + " was not found";
          if ((b = a.MakeSurface(c.width, c.height))) b.jk = c;
          return b;
        };
        a.MakeCanvasSurface || (a.MakeCanvasSurface = a.MakeSWCanvasSurface);
        a.MakeSurface = function (b, c) {
          var d = {
              width: b,
              height: c,
              colorType: a.ColorType.RGBA_8888,
              alphaType: a.AlphaType.Unpremul,
              colorSpace: a.SkColorSpace.SRGB,
            },
            e = b * c * 4,
            h = a._malloc(e);
          if ((d = this._getRasterDirectSurface(d, h, 4 * b)))
            (d.jk = null),
              (d.gm = b),
              (d.cm = c),
              (d.fm = e),
              (d.Gl = h),
              d.getCanvas().clear(a.TRANSPARENT);
          return d;
        };
        a.SkSurface.prototype.flush = function (b) {
          this._flush();
          if (this.jk) {
            var c = new Uint8ClampedArray(a.HEAPU8.buffer, this.Gl, this.fm);
            c = new ImageData(c, this.gm, this.cm);
            b
              ? this.jk
                  .getContext("2d")
                  .putImageData(
                    c,
                    0,
                    0,
                    b.fLeft,
                    b.fTop,
                    b.fRight - b.fLeft,
                    b.fBottom - b.fTop
                  )
              : this.jk.getContext("2d").putImageData(c, 0, 0);
          }
        };
        a.SkSurface.prototype.dispose = function () {
          this.Gl && a._free(this.Gl);
          this.delete();
        };
        a.currentContext = a.currentContext || function () {};
        a.setCurrentContext = a.setCurrentContext || function () {};
      });
    })(g);
    (function (a) {
      a.yk = a.yk || [];
      a.yk.push(function () {
        function b(c, d, e) {
          return c && c.hasOwnProperty(d) ? c[d] : e;
        }
        a.Dm = function (c, d) {
          if (!c) throw "null canvas passed into makeWebGLContext";
          d = {
            alpha: b(d, "alpha", 1),
            depth: b(d, "depth", 1),
            stencil: b(d, "stencil", 8),
            antialias: b(d, "antialias", 0),
            premultipliedAlpha: b(d, "premultipliedAlpha", 1),
            preserveDrawingBuffer: b(d, "preserveDrawingBuffer", 0),
            preferLowPowerToHighPerformance: b(
              d,
              "preferLowPowerToHighPerformance",
              0
            ),
            failIfMajorPerformanceCaveat: b(
              d,
              "failIfMajorPerformanceCaveat",
              0
            ),
            enableExtensionsByDefault: b(d, "enableExtensionsByDefault", 1),
            explicitSwapControl: b(d, "explicitSwapControl", 0),
            renderViaOffscreenBackBuffer: b(
              d,
              "renderViaOffscreenBackBuffer",
              0
            ),
          };
          if (d.explicitSwapControl)
            throw "explicitSwapControl is not supported";
          this.createContext(c, !0, !0, d);
        };
        a.GetWebGLContext = function (c, d) {
          this.Dm(c, d);
          return a.currentContext() || 0;
        };
        a.MakeWebGLCanvasSurface = function (c, d) {
          d = d || null;
          var e = c;
          if ("CANVAS" !== e.tagName && ((e = document.getElementById(c)), !e))
            throw "Canvas with id " + c + " was not found";
          c = this.GetWebGLContext(e);
          if (!c || 0 > c) throw "failed to create webgl context: err " + c;
          var h = this.MakeGrContext(c);
          d = this.MakeOnScreenGLSurface(h, e.width, e.height, d);
          if (!d)
            return (
              (d = e.cloneNode(!0)),
              e.parentNode.replaceChild(d, e),
              d.classList.add("ck-replaced"),
              a.MakeSWCanvasSurface(d)
            );
          d.Ok = c;
          d.grContext = h;
          return d;
        };
        a.MakeCanvasSurface = a.MakeWebGLCanvasSurface;
      });
    })(g);
    (function (a) {
      function b(m) {
        return Math.round(Math.max(0, Math.min(m || 0, 255)));
      }
      function c(m) {
        return m ? m.constructor === Float32Array && 4 === m.length : !1;
      }
      function d(m) {
        return (
          ((b(255 * m[3]) << 24) |
            (b(255 * m[0]) << 16) |
            (b(255 * m[1]) << 8) |
            (b(255 * m[2]) << 0)) >>>
          0
        );
      }
      function e(m) {
        if (void 0 === m) return 1;
        var w = parseFloat(m);
        return m && -1 !== m.indexOf("%") ? w / 100 : w;
      }
      function h(m, w, E) {
        if (!m || !m.length) return 0;
        if (m._ck) return m.byteOffset;
        var K = a[w].BYTES_PER_ELEMENT;
        E || (E = a._malloc(m.length * K));
        a[w].set(m, E / K);
        return E;
      }
      function n(m, w, E) {
        if (!m || !m.length) return 0;
        var K = a[w].BYTES_PER_ELEMENT;
        E || (E = a._malloc(m.length * m[0].length * K));
        w = a[w];
        var V = 0;
        K = E / K;
        for (var ba = 0; ba < m.length; ba++)
          for (var f = 0; f < m[0].length; f++) (w[K + V] = m[ba][f]), V++;
        return E;
      }
      function q(m) {
        if (!m) return 0;
        if (m.length) {
          if (6 !== m.length && 9 !== m.length) throw "invalid matrix size";
          var w = h(m, "HEAPF32", da);
          6 === m.length && a.HEAPF32.set(Z, 6 + w / 4);
          return w;
        }
        w = qa.toTypedArray();
        w[0] = m.m11;
        w[1] = m.m21;
        w[2] = m.m41;
        w[3] = m.m12;
        w[4] = m.m22;
        w[5] = m.m42;
        w[6] = m.m14;
        w[7] = m.m24;
        w[8] = m.m44;
        return da;
      }
      function u(m) {
        if (!m) return 0;
        var w = gb.toTypedArray();
        if (m.length) {
          if (16 !== m.length && 6 !== m.length && 9 !== m.length)
            throw "invalid matrix size";
          if (16 === m.length) return h(m, "HEAPF32", ia);
          w.fill(0);
          w[0] = m[0];
          w[1] = m[1];
          w[3] = m[2];
          w[4] = m[3];
          w[5] = m[4];
          w[7] = m[5];
          w[12] = m[6];
          w[13] = m[7];
          w[15] = m[8];
          6 === m.length && ((w[12] = 0), (w[13] = 0), (w[15] = 1));
          return ia;
        }
        w[0] = m.m11;
        w[1] = m.m21;
        w[2] = m.m31;
        w[3] = m.m41;
        w[4] = m.m12;
        w[5] = m.m22;
        w[6] = m.m32;
        w[7] = m.m42;
        w[8] = m.m13;
        w[9] = m.m23;
        w[10] = m.m33;
        w[11] = m.m43;
        w[12] = m.m14;
        w[13] = m.m24;
        w[14] = m.m34;
        w[15] = m.m44;
        return ia;
      }
      function A(m) {
        for (var w = Array(16), E = 0; 16 > E; E++) w[E] = a.HEAPF32[m / 4 + E];
        return w;
      }
      function C(m, w) {
        return h(m, "HEAPF32", w || Wa);
      }
      function M(m, w, E, K) {
        var V = Dc.toTypedArray();
        V[0] = m;
        V[1] = w;
        V[2] = E;
        V[3] = K;
        return Wa;
      }
      function Q(m) {
        for (var w = new Float32Array(4), E = 0; 4 > E; E++)
          w[E] = a.HEAPF32[m / 4 + E];
        return w;
      }
      function x(m, w) {
        w._ck || a._free(m);
      }
      a.Color = function (m, w, E, K) {
        void 0 === K && (K = 1);
        return a.Color4f(b(m) / 255, b(w) / 255, b(E) / 255, K);
      };
      a.ColorAsInt = function (m, w, E, K) {
        void 0 === K && (K = 255);
        return (
          ((b(K) << 24) |
            (b(m) << 16) |
            (b(w) << 8) |
            ((b(E) << 0) & 268435455)) >>>
          0
        );
      };
      a.Color4f = function (m, w, E, K) {
        void 0 === K && (K = 1);
        return Float32Array.of(m, w, E, K);
      };
      Object.defineProperty(a, "TRANSPARENT", {
        get: function () {
          return a.Color4f(0, 0, 0, 0);
        },
      });
      Object.defineProperty(a, "BLACK", {
        get: function () {
          return a.Color4f(0, 0, 0, 1);
        },
      });
      Object.defineProperty(a, "WHITE", {
        get: function () {
          return a.Color4f(1, 1, 1, 1);
        },
      });
      Object.defineProperty(a, "RED", {
        get: function () {
          return a.Color4f(1, 0, 0, 1);
        },
      });
      Object.defineProperty(a, "GREEN", {
        get: function () {
          return a.Color4f(0, 1, 0, 1);
        },
      });
      Object.defineProperty(a, "BLUE", {
        get: function () {
          return a.Color4f(0, 0, 1, 1);
        },
      });
      Object.defineProperty(a, "YELLOW", {
        get: function () {
          return a.Color4f(1, 1, 0, 1);
        },
      });
      Object.defineProperty(a, "CYAN", {
        get: function () {
          return a.Color4f(0, 1, 1, 1);
        },
      });
      Object.defineProperty(a, "MAGENTA", {
        get: function () {
          return a.Color4f(1, 0, 1, 1);
        },
      });
      a.getColorComponents = function (m) {
        return [
          Math.floor(255 * m[0]),
          Math.floor(255 * m[1]),
          Math.floor(255 * m[2]),
          m[3],
        ];
      };
      a.parseColorString = function (m, w) {
        m = m.toLowerCase();
        if (m.startsWith("#")) {
          w = 255;
          switch (m.length) {
            case 9:
              w = parseInt(m.slice(7, 9), 16);
            case 7:
              var E = parseInt(m.slice(1, 3), 16);
              var K = parseInt(m.slice(3, 5), 16);
              var V = parseInt(m.slice(5, 7), 16);
              break;
            case 5:
              w = 17 * parseInt(m.slice(4, 5), 16);
            case 4:
              (E = 17 * parseInt(m.slice(1, 2), 16)),
                (K = 17 * parseInt(m.slice(2, 3), 16)),
                (V = 17 * parseInt(m.slice(3, 4), 16));
          }
          return a.Color(E, K, V, w / 255);
        }
        return m.startsWith("rgba")
          ? ((m = m.slice(5, -1)),
            (m = m.split(",")),
            a.Color(+m[0], +m[1], +m[2], e(m[3])))
          : m.startsWith("rgb")
          ? ((m = m.slice(4, -1)),
            (m = m.split(",")),
            a.Color(+m[0], +m[1], +m[2], e(m[3])))
          : m.startsWith("gray(") ||
            m.startsWith("hsl") ||
            !w ||
            ((m = w[m]), void 0 === m)
          ? a.BLACK
          : m;
      };
      a.multiplyByAlpha = function (m, w) {
        m = m.slice();
        m[3] = Math.max(0, Math.min(m[3] * w, 1));
        return m;
      };
      var P = !new Function(
          "try {return this===window;}catch(e){ return false;}"
        )(),
        Z = Float32Array.of(0, 0, 1),
        da = 0,
        qa,
        ia = 0,
        gb,
        Wa = 0,
        Dc,
        Ec = {};
      a.Uk = function () {
        this.Nk = [];
        this.rk = null;
        Object.defineProperty(this, "length", {
          enumerable: !0,
          get: function () {
            return this.Nk.length / 4;
          },
        });
      };
      a.Uk.prototype.push = function (m, w, E, K) {
        this.rk || this.Nk.push(m, w, E, K);
      };
      a.Uk.prototype.set = function (m, w, E, K, V) {
        0 > m ||
          m >= this.Nk.length / 4 ||
          ((m *= 4),
          this.rk
            ? ((m = this.rk / 4 + m),
              (a.HEAPF32[m] = w),
              (a.HEAPF32[m + 1] = E),
              (a.HEAPF32[m + 2] = K),
              (a.HEAPF32[m + 3] = V))
            : ((this.Nk[m] = w),
              (this.Nk[m + 1] = E),
              (this.Nk[m + 2] = K),
              (this.Nk[m + 3] = V)));
      };
      a.Uk.prototype.build = function () {
        return this.rk ? this.rk : (this.rk = h(this.Nk, "HEAPF32"));
      };
      a.Uk.prototype.delete = function () {
        this.rk && (a._free(this.rk), (this.rk = null));
      };
      a.jl = function () {
        this.pl = [];
        this.rk = null;
        Object.defineProperty(this, "length", {
          enumerable: !0,
          get: function () {
            return this.pl.length;
          },
        });
      };
      a.jl.prototype.push = function (m) {
        this.rk || this.pl.push(m);
      };
      a.jl.prototype.set = function (m, w) {
        0 > m ||
          m >= this.pl.length ||
          ((m *= 4),
          this.rk ? (a.HEAPU32[this.rk / 4 + m] = w) : (this.pl[m] = w));
      };
      a.jl.prototype.build = function () {
        return this.rk ? this.rk : (this.rk = h(this.pl, "HEAPU32"));
      };
      a.jl.prototype.delete = function () {
        this.rk && (a._free(this.rk), (this.rk = null));
      };
      a.SkRectBuilder = a.Uk;
      a.RSXFormBuilder = a.Uk;
      a.SkColorBuilder = a.jl;
      a.Malloc = function (m, w) {
        var E = a._malloc(w * m.BYTES_PER_ELEMENT);
        return {
          _ck: !0,
          length: w,
          byteOffset: E,
          Tk: null,
          toTypedArray: function () {
            if (this.Tk && this.Tk.length) return this.Tk;
            this.Tk = new m(a.HEAPU8.buffer, E, w);
            this.Tk._ck = !0;
            return this.Tk;
          },
        };
      };
      a.Free = function (m) {
        a._free(m.byteOffset);
        m.byteOffset = 0;
        m.toTypedArray = null;
        m.Tk = null;
      };
      a.onRuntimeInitialized = function () {
        function m(f, p, t, z, F) {
          for (var I = 0; I < f.length; I++)
            p[I * t + ((I * F + z + t) % t)] = f[I];
          return p;
        }
        function w(f) {
          for (var p = f * f, t = Array(p); p--; )
            t[p] = 0 == p % (f + 1) ? 1 : 0;
          return t;
        }
        function E() {
          for (var f = 0, p = 0; p < arguments.length - 1; p += 2)
            f += arguments[p] * arguments[p + 1];
          return f;
        }
        function K(f, p, t) {
          for (var z = Array(f.length), F = 0; F < t; F++)
            for (var I = 0; I < t; I++) {
              for (var S = 0, T = 0; T < t; T++)
                S += f[t * F + T] * p[t * T + I];
              z[F * t + I] = S;
            }
          return z;
        }
        function V(f, p) {
          for (var t = K(p[0], p[1], f), z = 2; z < p.length; )
            (t = K(t, p[z], f)), z++;
          return t;
        }
        Dc = a.Malloc(Float32Array, 4);
        Wa = Dc.byteOffset;
        gb = a.Malloc(Float32Array, 16);
        ia = gb.byteOffset;
        qa = a.Malloc(Float32Array, 9);
        da = qa.byteOffset;
        a.SkColorSpace.SRGB = a.SkColorSpace._MakeSRGB();
        a.SkColorSpace.DISPLAY_P3 = a.SkColorSpace._MakeDisplayP3();
        a.SkColorSpace.ADOBE_RGB = a.SkColorSpace._MakeAdobeRGB();
        a.SkMatrix = {};
        a.SkMatrix.identity = function () {
          return w(3);
        };
        a.SkMatrix.invert = function (f) {
          var p =
            f[0] * f[4] * f[8] +
            f[1] * f[5] * f[6] +
            f[2] * f[3] * f[7] -
            f[2] * f[4] * f[6] -
            f[1] * f[3] * f[8] -
            f[0] * f[5] * f[7];
          return p
            ? [
                (f[4] * f[8] - f[5] * f[7]) / p,
                (f[2] * f[7] - f[1] * f[8]) / p,
                (f[1] * f[5] - f[2] * f[4]) / p,
                (f[5] * f[6] - f[3] * f[8]) / p,
                (f[0] * f[8] - f[2] * f[6]) / p,
                (f[2] * f[3] - f[0] * f[5]) / p,
                (f[3] * f[7] - f[4] * f[6]) / p,
                (f[1] * f[6] - f[0] * f[7]) / p,
                (f[0] * f[4] - f[1] * f[3]) / p,
              ]
            : null;
        };
        a.SkMatrix.mapPoints = function (f, p) {
          for (var t = 0; t < p.length; t += 2) {
            var z = p[t],
              F = p[t + 1],
              I = f[6] * z + f[7] * F + f[8],
              S = f[3] * z + f[4] * F + f[5];
            p[t] = (f[0] * z + f[1] * F + f[2]) / I;
            p[t + 1] = S / I;
          }
          return p;
        };
        a.SkMatrix.multiply = function () {
          return V(3, arguments);
        };
        a.SkMatrix.rotated = function (f, p, t) {
          p = p || 0;
          t = t || 0;
          var z = Math.sin(f);
          f = Math.cos(f);
          return [f, -z, E(z, t, 1 - f, p), z, f, E(-z, p, 1 - f, t), 0, 0, 1];
        };
        a.SkMatrix.scaled = function (f, p, t, z) {
          t = t || 0;
          z = z || 0;
          var F = m([f, p], w(3), 3, 0, 1);
          return m([t - f * t, z - p * z], F, 3, 2, 0);
        };
        a.SkMatrix.skewed = function (f, p, t, z) {
          t = t || 0;
          z = z || 0;
          var F = m([f, p], w(3), 3, 1, -1);
          return m([-f * t, -p * z], F, 3, 2, 0);
        };
        a.SkMatrix.translated = function (f, p) {
          return m(arguments, w(3), 3, 2, 0);
        };
        a.SkVector = {};
        a.SkVector.dot = function (f, p) {
          return f
            .map(function (t, z) {
              return t * p[z];
            })
            .reduce(function (t, z) {
              return t + z;
            });
        };
        a.SkVector.lengthSquared = function (f) {
          return a.SkVector.dot(f, f);
        };
        a.SkVector.length = function (f) {
          return Math.sqrt(a.SkVector.lengthSquared(f));
        };
        a.SkVector.mulScalar = function (f, p) {
          return f.map(function (t) {
            return t * p;
          });
        };
        a.SkVector.add = function (f, p) {
          return f.map(function (t, z) {
            return t + p[z];
          });
        };
        a.SkVector.sub = function (f, p) {
          return f.map(function (t, z) {
            return t - p[z];
          });
        };
        a.SkVector.dist = function (f, p) {
          return a.SkVector.length(a.SkVector.sub(f, p));
        };
        a.SkVector.normalize = function (f) {
          return a.SkVector.mulScalar(f, 1 / a.SkVector.length(f));
        };
        a.SkVector.cross = function (f, p) {
          return [
            f[1] * p[2] - f[2] * p[1],
            f[2] * p[0] - f[0] * p[2],
            f[0] * p[1] - f[1] * p[0],
          ];
        };
        a.SkM44 = {};
        a.SkM44.identity = function () {
          return w(4);
        };
        a.SkM44.translated = function (f) {
          return m(f, w(4), 4, 3, 0);
        };
        a.SkM44.scaled = function (f) {
          return m(f, w(4), 4, 0, 1);
        };
        a.SkM44.rotated = function (f, p) {
          return a.SkM44.rotatedUnitSinCos(
            a.SkVector.normalize(f),
            Math.sin(p),
            Math.cos(p)
          );
        };
        a.SkM44.rotatedUnitSinCos = function (f, p, t) {
          var z = f[0],
            F = f[1];
          f = f[2];
          var I = 1 - t;
          return [
            I * z * z + t,
            I * z * F - p * f,
            I * z * f + p * F,
            0,
            I * z * F + p * f,
            I * F * F + t,
            I * F * f - p * z,
            0,
            I * z * f - p * F,
            I * F * f + p * z,
            I * f * f + t,
            0,
            0,
            0,
            0,
            1,
          ];
        };
        a.SkM44.lookat = function (f, p, t) {
          p = a.SkVector.normalize(a.SkVector.sub(p, f));
          t = a.SkVector.normalize(t);
          t = a.SkVector.normalize(a.SkVector.cross(p, t));
          var z = a.SkM44.identity();
          m(t, z, 4, 0, 0);
          m(a.SkVector.cross(t, p), z, 4, 1, 0);
          m(a.SkVector.mulScalar(p, -1), z, 4, 2, 0);
          m(f, z, 4, 3, 0);
          f = a.SkM44.invert(z);
          return null === f ? a.SkM44.identity() : f;
        };
        a.SkM44.perspective = function (f, p, t) {
          var z = 1 / (p - f);
          t /= 2;
          t = Math.cos(t) / Math.sin(t);
          return [
            t,
            0,
            0,
            0,
            0,
            t,
            0,
            0,
            0,
            0,
            (p + f) * z,
            2 * p * f * z,
            0,
            0,
            -1,
            1,
          ];
        };
        a.SkM44.rc = function (f, p, t) {
          return f[4 * p + t];
        };
        a.SkM44.multiply = function () {
          return V(4, arguments);
        };
        a.SkM44.invert = function (f) {
          var p = f[0],
            t = f[4],
            z = f[8],
            F = f[12],
            I = f[1],
            S = f[5],
            T = f[9],
            W = f[13],
            X = f[2],
            ra = f[6],
            sa = f[10],
            ta = f[14],
            J = f[3],
            l = f[7],
            r = f[11];
          f = f[15];
          var y = p * S - t * I,
            B = p * T - z * I,
            D = p * W - F * I,
            H = t * T - z * S,
            O = t * W - F * S,
            ca = z * W - F * T,
            ka = X * l - ra * J,
            ua = X * r - sa * J,
            va = X * f - ta * J,
            hb = ra * r - sa * l,
            ib = ra * f - ta * l,
            jb = sa * f - ta * r,
            kd = y * jb - B * ib + D * hb + H * va - O * ua + ca * ka,
            wa = 1 / kd;
          if (0 === kd || Infinity === wa) return null;
          y *= wa;
          B *= wa;
          D *= wa;
          H *= wa;
          O *= wa;
          ca *= wa;
          ka *= wa;
          ua *= wa;
          va *= wa;
          hb *= wa;
          ib *= wa;
          jb *= wa;
          p = [
            S * jb - T * ib + W * hb,
            T * va - I * jb - W * ua,
            I * ib - S * va + W * ka,
            S * ua - I * hb - T * ka,
            z * ib - t * jb - F * hb,
            p * jb - z * va + F * ua,
            t * va - p * ib - F * ka,
            p * hb - t * ua + z * ka,
            l * ca - r * O + f * H,
            r * D - J * ca - f * B,
            J * O - l * D + f * y,
            l * B - J * H - r * y,
            sa * O - ra * ca - ta * H,
            X * ca - sa * D + ta * B,
            ra * D - X * O - ta * y,
            X * H - ra * B + sa * y,
          ];
          return p.every(function (ld) {
            return Infinity !== ld && -Infinity !== ld;
          })
            ? p
            : null;
        };
        a.SkM44.transpose = function (f) {
          return [
            f[0],
            f[4],
            f[8],
            f[12],
            f[1],
            f[5],
            f[9],
            f[13],
            f[2],
            f[6],
            f[10],
            f[14],
            f[3],
            f[7],
            f[11],
            f[15],
          ];
        };
        a.SkColorMatrix = {};
        a.SkColorMatrix.identity = function () {
          var f = new Float32Array(20);
          f[0] = 1;
          f[6] = 1;
          f[12] = 1;
          f[18] = 1;
          return f;
        };
        a.SkColorMatrix.scaled = function (f, p, t, z) {
          var F = new Float32Array(20);
          F[0] = f;
          F[6] = p;
          F[12] = t;
          F[18] = z;
          return F;
        };
        var ba = [
          [6, 7, 11, 12],
          [0, 10, 2, 12],
          [0, 1, 5, 6],
        ];
        a.SkColorMatrix.rotated = function (f, p, t) {
          var z = a.SkColorMatrix.identity();
          f = ba[f];
          z[f[0]] = t;
          z[f[1]] = p;
          z[f[2]] = -p;
          z[f[3]] = t;
          return z;
        };
        a.SkColorMatrix.postTranslate = function (f, p, t, z, F) {
          f[4] += p;
          f[9] += t;
          f[14] += z;
          f[19] += F;
          return f;
        };
        a.SkColorMatrix.concat = function (f, p) {
          for (var t = new Float32Array(20), z = 0, F = 0; 20 > F; F += 5) {
            for (var I = 0; 4 > I; I++)
              t[z++] =
                f[F] * p[I] +
                f[F + 1] * p[I + 5] +
                f[F + 2] * p[I + 10] +
                f[F + 3] * p[I + 15];
            t[z++] =
              f[F] * p[4] +
              f[F + 1] * p[9] +
              f[F + 2] * p[14] +
              f[F + 3] * p[19] +
              f[F + 4];
          }
          return t;
        };
        a.SkPath.prototype.addArc = function (f, p, t) {
          this._addArc(f, p, t);
          return this;
        };
        a.SkPath.prototype.addOval = function (f, p, t) {
          void 0 === t && (t = 1);
          this._addOval(f, !!p, t);
          return this;
        };
        a.SkPath.prototype.addPath = function () {
          var f = Array.prototype.slice.call(arguments),
            p = f[0],
            t = !1;
          "boolean" === typeof f[f.length - 1] && (t = f.pop());
          if (1 === f.length) this._addPath(p, 1, 0, 0, 0, 1, 0, 0, 0, 1, t);
          else if (2 === f.length)
            (f = f[1]),
              this._addPath(
                p,
                f[0],
                f[1],
                f[2],
                f[3],
                f[4],
                f[5],
                f[6] || 0,
                f[7] || 0,
                f[8] || 1,
                t
              );
          else if (7 === f.length || 10 === f.length)
            this._addPath(
              p,
              f[1],
              f[2],
              f[3],
              f[4],
              f[5],
              f[6],
              f[7] || 0,
              f[8] || 0,
              f[9] || 1,
              t
            );
          else return null;
          return this;
        };
        a.SkPath.prototype.addPoly = function (f, p) {
          if (f._ck) {
            var t = f.byteOffset;
            var z = f.length / 2;
          } else (t = n(f, "HEAPF32")), (z = f.length);
          this._addPoly(t, z, p);
          x(t, f);
          return this;
        };
        a.SkPath.prototype.addRect = function () {
          if (1 === arguments.length || 2 === arguments.length) {
            var f = arguments[0];
            this._addRect(
              f.fLeft,
              f.fTop,
              f.fRight,
              f.fBottom,
              arguments[1] || !1
            );
          } else if (4 === arguments.length || 5 === arguments.length)
            (f = arguments), this._addRect(f[0], f[1], f[2], f[3], f[4] || !1);
          else return null;
          return this;
        };
        a.SkPath.prototype.addRoundRect = function () {
          var f = arguments;
          if (3 === f.length || 6 === f.length) var p = f[f.length - 2];
          else if (4 === f.length || 7 === f.length) {
            p = f[f.length - 3];
            var t = f[f.length - 2];
            p = [p, t, p, t, p, t, p, t];
          } else return null;
          if (8 !== p.length) return null;
          t = h(p, "HEAPF32");
          if (3 === f.length || 4 === f.length) {
            var z = f[0],
              F = f[f.length - 1];
            this._addRoundRect(z.fLeft, z.fTop, z.fRight, z.fBottom, t, F);
          } else
            (6 !== f.length && 7 !== f.length) ||
              this._addRoundRect(f[0], f[1], f[2], f[3], t, F);
          x(t, p);
          return this;
        };
        a.SkPath.prototype.arc = function (f, p, t, z, F, I) {
          f = a.LTRBRect(f - t, p - t, f + t, p + t);
          F = ((F - z) / Math.PI) * 180 - 360 * !!I;
          I = new a.SkPath();
          I.addArc(f, (z / Math.PI) * 180, F);
          this.addPath(I, !0);
          I.delete();
          return this;
        };
        a.SkPath.prototype.arcTo = function () {
          var f = arguments;
          if (5 === f.length) this._arcTo(f[0], f[1], f[2], f[3], f[4]);
          else if (4 === f.length) this._arcTo(f[0], f[1], f[2], f[3]);
          else if (7 === f.length)
            this._arcTo(f[0], f[1], f[2], !!f[3], !!f[4], f[5], f[6]);
          else
            throw (
              "Invalid args for arcTo. Expected 4, 5, or 7, got " + f.length
            );
          return this;
        };
        a.SkPath.prototype.close = function () {
          this._close();
          return this;
        };
        a.SkPath.prototype.conicTo = function (f, p, t, z, F) {
          this._conicTo(f, p, t, z, F);
          return this;
        };
        a.SkPath.prototype.cubicTo = function (f, p, t, z, F, I) {
          this._cubicTo(f, p, t, z, F, I);
          return this;
        };
        a.SkPath.prototype.dash = function (f, p, t) {
          return this._dash(f, p, t) ? this : null;
        };
        a.SkPath.prototype.lineTo = function (f, p) {
          this._lineTo(f, p);
          return this;
        };
        a.SkPath.prototype.moveTo = function (f, p) {
          this._moveTo(f, p);
          return this;
        };
        a.SkPath.prototype.offset = function (f, p) {
          this._transform(1, 0, f, 0, 1, p, 0, 0, 1);
          return this;
        };
        a.SkPath.prototype.quadTo = function (f, p, t, z) {
          this._quadTo(f, p, t, z);
          return this;
        };
        a.SkPath.prototype.rArcTo = function (f, p, t, z, F, I, S) {
          this._rArcTo(f, p, t, z, F, I, S);
          return this;
        };
        a.SkPath.prototype.rConicTo = function (f, p, t, z, F) {
          this._rConicTo(f, p, t, z, F);
          return this;
        };
        a.SkPath.prototype.rCubicTo = function (f, p, t, z, F, I) {
          this._rCubicTo(f, p, t, z, F, I);
          return this;
        };
        a.SkPath.prototype.rLineTo = function (f, p) {
          this._rLineTo(f, p);
          return this;
        };
        a.SkPath.prototype.rMoveTo = function (f, p) {
          this._rMoveTo(f, p);
          return this;
        };
        a.SkPath.prototype.rQuadTo = function (f, p, t, z) {
          this._rQuadTo(f, p, t, z);
          return this;
        };
        a.SkPath.prototype.stroke = function (f) {
          f = f || {};
          f.width = f.width || 1;
          f.miter_limit = f.miter_limit || 4;
          f.cap = f.cap || a.StrokeCap.Butt;
          f.join = f.join || a.StrokeJoin.Miter;
          f.precision = f.precision || 1;
          return this._stroke(f) ? this : null;
        };
        a.SkPath.prototype.transform = function () {
          if (1 === arguments.length) {
            var f = arguments[0];
            this._transform(
              f[0],
              f[1],
              f[2],
              f[3],
              f[4],
              f[5],
              f[6] || 0,
              f[7] || 0,
              f[8] || 1
            );
          } else if (6 === arguments.length || 9 === arguments.length)
            (f = arguments),
              this._transform(
                f[0],
                f[1],
                f[2],
                f[3],
                f[4],
                f[5],
                f[6] || 0,
                f[7] || 0,
                f[8] || 1
              );
          else
            throw (
              "transform expected to take 1 or 9 arguments. Got " +
              arguments.length
            );
          return this;
        };
        a.SkPath.prototype.trim = function (f, p, t) {
          return this._trim(f, p, !!t) ? this : null;
        };
        a.SkImage.prototype.encodeToData = function () {
          if (!arguments.length) return this._encodeToData();
          if (2 === arguments.length) {
            var f = arguments;
            return this._encodeToDataWithFormat(f[0], f[1]);
          }
          throw (
            "encodeToData expected to take 0 or 2 arguments. Got " +
            arguments.length
          );
        };
        a.SkImage.prototype.makeShader = function (f, p, t) {
          t = q(t);
          return this._makeShader(f, p, t);
        };
        a.SkImage.prototype.readPixels = function (f, p, t) {
          switch (f.colorType) {
            case a.ColorType.RGBA_8888:
              var z = 4 * f.width;
              break;
            case a.ColorType.RGBA_F32:
              z = 16 * f.width;
              break;
            default:
              return;
          }
          var F = z * f.height,
            I = a._malloc(F);
          if (!this._readPixels(f, I, z, p, t)) return null;
          p = null;
          switch (f.colorType) {
            case a.ColorType.RGBA_8888:
              p = new Uint8Array(a.HEAPU8.buffer, I, F).slice();
              break;
            case a.ColorType.RGBA_F32:
              p = new Float32Array(a.HEAPU8.buffer, I, F).slice();
          }
          a._free(I);
          return p;
        };
        a.SkCanvas.prototype.clear = function (f) {
          f = C(f);
          this._clear(f);
        };
        a.SkCanvas.prototype.concat = function (f) {
          f = u(f);
          this._concat(f);
        };
        a.SkCanvas.prototype.concat44 = a.SkCanvas.prototype.concat;
        a.SkCanvas.prototype.drawAtlas = function (f, p, t, z, F, I) {
          if (f && z && p && t && p.length === t.length) {
            F || (F = a.BlendMode.SrcOver);
            var S;
            p.build ? (S = p.build()) : (S = h(p, "HEAPF32"));
            if (t.build) {
              var T = t.build();
              var W = t.length;
            } else (T = h(t, "HEAPF32")), (W = t.length / 4);
            var X = 0;
            I && (I.build ? (X = I.build()) : (X = h(I, "HEAPU32")));
            this._drawAtlas(f, T, S, X, W, F, z);
            S && !p.build && x(S, p);
            T && !t.build && x(T, t);
            X && !I.build && x(X, I);
          }
        };
        a.SkCanvas.prototype.drawColor = function (f, p) {
          f = C(f);
          void 0 !== p ? this._drawColor(f, p) : this._drawColor(f);
        };
        a.SkCanvas.prototype.drawColorComponents = function (f, p, t, z, F) {
          f = M(f, p, t, z);
          void 0 !== F ? this._drawColor(f, F) : this._drawColor(f);
        };
        a.SkCanvas.prototype.drawPoints = function (f, p, t) {
          if (p._ck) {
            var z = p.byteOffset;
            var F = p.length / 2;
          } else (z = n(p, "HEAPF32")), (F = p.length);
          this._drawPoints(f, z, F, t);
          x(z, p);
        };
        a.SkCanvas.prototype.drawShadow = function (f, p, t, z, F, I, S) {
          var T = h(F, "HEAPF32"),
            W = h(I, "HEAPF32");
          this._drawShadow(f, p, t, z, T, W, S);
          x(T, F);
          x(W, I);
        };
        a.SkCanvas.prototype.getLocalToDevice = function () {
          this._getLocalToDevice(ia);
          return A(ia);
        };
        a.SkCanvas.prototype.findMarkedCTM = function (f) {
          return this._findMarkedCTM(f, ia) ? A(ia) : null;
        };
        a.SkCanvas.prototype.getTotalMatrix = function () {
          this._getTotalMatrix(da);
          for (var f = Array(9), p = 0; 9 > p; p++)
            f[p] = a.HEAPF32[da / 4 + p];
          return f;
        };
        a.SkCanvas.prototype.readPixels = function (f, p, t, z, F, I, S, T) {
          F = F || a.AlphaType.Unpremul;
          I = I || a.ColorType.RGBA_8888;
          S = S || a.SkColorSpace.SRGB;
          var W = 4;
          I === a.ColorType.RGBA_F16 && (W = 8);
          T = T || W * t;
          var X = z * T;
          W = a._malloc(X);
          if (
            !this._readPixels(
              {
                width: t,
                height: z,
                colorType: I,
                alphaType: F,
                colorSpace: S,
              },
              W,
              T,
              f,
              p
            )
          )
            return a._free(W), null;
          f = new Uint8Array(a.HEAPU8.buffer, W, X).slice();
          a._free(W);
          return f;
        };
        a.SkCanvas.prototype.writePixels = function (f, p, t, z, F, I, S, T) {
          if (f.byteLength % (p * t))
            throw "pixels length must be a multiple of the srcWidth * srcHeight";
          var W = f.byteLength / (p * t);
          I = I || a.AlphaType.Unpremul;
          S = S || a.ColorType.RGBA_8888;
          T = T || a.SkColorSpace.SRGB;
          var X = W * p;
          W = h(f, "HEAPU8");
          p = this._writePixels(
            { width: p, height: t, colorType: S, alphaType: I, colorSpace: T },
            W,
            X,
            z,
            F
          );
          x(W, f);
          return p;
        };
        a.SkColorFilter.MakeBlend = function (f, p) {
          f = C(f);
          return a.SkColorFilter._MakeBlend(f, p);
        };
        a.SkColorFilter.MakeMatrix = function (f) {
          if (!f || 20 !== f.length) throw "invalid color matrix";
          var p = h(f, "HEAPF32"),
            t = a.SkColorFilter._makeMatrix(p);
          x(p, f);
          return t;
        };
        a.SkImageFilter.MakeMatrixTransform = function (f, p, t) {
          f = q(f);
          return a.SkImageFilter._MakeMatrixTransform(f, p, t);
        };
        a.SkPaint.prototype.getColor = function () {
          this._getColor(Wa);
          return Q(Wa);
        };
        a.SkPaint.prototype.setColor = function (f, p) {
          p = p || null;
          f = C(f);
          this._setColor(f, p);
        };
        a.SkPaint.prototype.setColorComponents = function (f, p, t, z, F) {
          F = F || null;
          f = M(f, p, t, z);
          this._setColor(f, F);
        };
        a.SkSurface.prototype.captureFrameAsSkPicture = function (f) {
          var p = new a.SkPictureRecorder(),
            t = p.beginRecording(a.LTRBRect(0, 0, this.width(), this.height()));
          f(t);
          f = p.finishRecordingAsPicture();
          p.delete();
          return f;
        };
        a.SkSurface.prototype.requestAnimationFrame = function (f, p) {
          this.kl || (this.kl = this.getCanvas());
          window.requestAnimationFrame(
            function () {
              void 0 !== this.Ok && a.setCurrentContext(this.Ok);
              f(this.kl);
              this.flush(p);
            }.bind(this)
          );
        };
        a.SkSurface.prototype.drawOnce = function (f, p) {
          this.kl || (this.kl = this.getCanvas());
          window.requestAnimationFrame(
            function () {
              void 0 !== this.Ok && a.setCurrentContext(this.Ok);
              f(this.kl);
              this.flush(p);
              this.dispose();
            }.bind(this)
          );
        };
        a.SkPathEffect.MakeDash = function (f, p) {
          p || (p = 0);
          if (!f.length || 1 === f.length % 2)
            throw "Intervals array must have even length";
          var t = h(f, "HEAPF32");
          p = a.SkPathEffect._MakeDash(t, f.length, p);
          x(t, f);
          return p;
        };
        a.SkShader.Color = function (f, p) {
          p = p || null;
          f = C(f);
          return a.SkShader._Color(f, p);
        };
        a.SkShader.MakeLinearGradient = function (f, p, t, z, F, I, S, T) {
          T = T || null;
          var W = n(t, "HEAPF32"),
            X = h(z, "HEAPF32");
          S = S || 0;
          I = q(I);
          f = a._MakeLinearGradientShader(f, p, W, X, t.length, F, S, I, T);
          a._free(W);
          z && x(X, z);
          return f;
        };
        a.SkShader.MakeRadialGradient = function (f, p, t, z, F, I, S, T) {
          T = T || null;
          var W = n(t, "HEAPF32"),
            X = h(z, "HEAPF32");
          S = S || 0;
          I = q(I);
          f = a._MakeRadialGradientShader(f, p, W, X, t.length, F, S, I, T);
          a._free(W);
          z && x(X, z);
          return f;
        };
        a.SkShader.MakeSweepGradient = function (f, p, t, z, F, I, S, T, W, X) {
          X = X || null;
          var ra = n(t, "HEAPF32"),
            sa = h(z, "HEAPF32");
          S = S || 0;
          T = T || 0;
          W = W || 360;
          I = q(I);
          f = a._MakeSweepGradientShader(
            f,
            p,
            ra,
            sa,
            t.length,
            F,
            T,
            W,
            S,
            I,
            X
          );
          a._free(ra);
          z && x(sa, z);
          return f;
        };
        a.SkShader.MakeTwoPointConicalGradient = function (
          f,
          p,
          t,
          z,
          F,
          I,
          S,
          T,
          W,
          X
        ) {
          X = X || null;
          var ra = n(F, "HEAPF32"),
            sa = h(I, "HEAPF32");
          W = W || 0;
          T = q(T);
          f = a._MakeTwoPointConicalGradientShader(
            f,
            p,
            t,
            z,
            ra,
            sa,
            F.length,
            S,
            W,
            T,
            X
          );
          a._free(ra);
          I && x(sa, I);
          return f;
        };
        a.Zm = a.SkPathEffect.MakeDash;
        a.Xm = a.SkShader.MakeLinearGradient;
        a.Ym = a.SkShader.MakeRadialGradient;
        a.$m = a.SkShader.MakeTwoPointConicalGradient;
        a.yk &&
          a.yk.forEach(function (f) {
            f();
          });
      };
      a.computeTonalColors = function (m) {
        var w = h(m.ambient, "HEAPF32"),
          E = h(m.spot, "HEAPF32");
        this._computeTonalColors(w, E);
        var K = { ambient: Q(w), spot: Q(E) };
        x(w, m.ambient);
        x(E, m.spot);
        return K;
      };
      a.LTRBRect = function (m, w, E, K) {
        return { fLeft: m, fTop: w, fRight: E, fBottom: K };
      };
      a.XYWHRect = function (m, w, E, K) {
        return { fLeft: m, fTop: w, fRight: m + E, fBottom: w + K };
      };
      a.RRectXY = function (m, w, E) {
        return {
          rect: m,
          rx1: w,
          ry1: E,
          rx2: w,
          ry2: E,
          rx3: w,
          ry3: E,
          rx4: w,
          ry4: E,
        };
      };
      a.MakePathFromCmds = function (m) {
        for (var w = 0, E = 0; E < m.length; E++) w += m[E].length;
        if (Ec[w]) var K = Ec[w];
        else (K = new Float32Array(w)), (Ec[w] = K);
        var V = 0;
        for (E = 0; E < m.length; E++)
          for (var ba = 0; ba < m[E].length; ba++) (K[V] = m[E][ba]), V++;
        m = [h(K, "HEAPF32"), w];
        w = a._MakePathFromCmds(m[0], m[1]);
        a._free(m[0]);
        return w;
      };
      a.MakeAnimatedImageFromEncoded = function (m) {
        m = new Uint8Array(m);
        var w = a._malloc(m.byteLength);
        a.HEAPU8.set(m, w);
        return (m = a._decodeAnimatedImage(w, m.byteLength)) ? m : null;
      };
      a.MakeImageFromEncoded = function (m) {
        m = new Uint8Array(m);
        var w = a._malloc(m.byteLength);
        a.HEAPU8.set(m, w);
        return (m = a._decodeImage(w, m.byteLength)) ? m : null;
      };
      a.MakeImage = function (m, w, E, K, V, ba) {
        var f = m.length / (w * E);
        E = { width: w, height: E, alphaType: K, colorType: V, colorSpace: ba };
        K = h(m, "HEAPU8");
        return a._MakeImage(E, K, m.length, w * f);
      };
      a.MakeSkVertices = function (m, w, E, K, V, ba) {
        var f = (V && V.length) || 0,
          p = 0;
        E && E.length && (p |= 1);
        K && K.length && (p |= 2);
        void 0 === ba || ba || (p |= 4);
        m = new a._SkVerticesBuilder(m, w.length, f, p);
        n(w, "HEAPF32", m.positions());
        m.texCoords() && n(E, "HEAPF32", m.texCoords());
        m.colors() && h(K.map(d), "HEAPU32", m.colors());
        m.indices() && h(V, "HEAPU16", m.indices());
        return m.detach();
      };
      (function (m) {
        m.yk = m.yk || [];
        m.yk.push(function () {
          function w(f) {
            if (K[f]) return K[f];
            var p = ea(f) + 1,
              t = m._malloc(p);
            fa(f, t, p);
            return (K[f] = t);
          }
          function E(f) {
            f._colorPtr = C(f.color);
            f._foregroundColorPtr = 0;
            f._backgroundColorPtr = 0;
            f.foregroundColor &&
              (f._foregroundColorPtr = C(f.foregroundColor, V));
            f.backgroundColor &&
              (f._backgroundColorPtr = C(f.backgroundColor, ba));
            if (Array.isArray(f.fontFamilies) && f.fontFamilies.length) {
              var p;
              if ((p = f.fontFamilies) && p.length) {
                for (var t = [], z = 0; z < p.length; z++) {
                  var F = w(p[z]);
                  t.push(F);
                }
                p = h(t, "HEAPU32");
              } else p = 0;
              f._fontFamiliesPtr = p;
              f._fontFamiliesLen = f.fontFamilies.length;
            } else (f._fontFamiliesPtr = 0), (f._fontFamiliesLen = 0);
          }
          m.Paragraph.prototype.getRectsForRange = function (f, p, t, z) {
            f = this._getRectsForRange(f, p, t, z);
            if (!f || !f.length) return [];
            p = [];
            for (t = 0; t < f.length; t += 5)
              (z = m.LTRBRect(f[t], f[t + 1], f[t + 2], f[t + 3])),
                (z.direction =
                  0 === f[t + 4] ? m.TextDirection.RTL : m.TextDirection.LTR),
                p.push(z);
            m._free(f.byteOffset);
            return p;
          };
          m.ParagraphStyle = function (f) {
            f.disableHinting = f.disableHinting || !1;
            if (f.ellipsis) {
              var p = f.ellipsis;
              f._ellipsisPtr = w(p);
              f._ellipsisLen = ea(p) + 1;
            } else (f._ellipsisPtr = 0), (f._ellipsisLen = 0);
            f.heightMultiplier = f.heightMultiplier || 0;
            f.maxLines = f.maxLines || 0;
            f.textAlign = f.textAlign || m.TextAlign.Start;
            f.textDirection = f.textDirection || m.TextDirection.LTR;
            f.textStyle = m.TextStyle(f.textStyle);
            return f;
          };
          m.TextStyle = function (f) {
            c(f.color) || (f.color = m.BLACK);
            f.decoration = f.decoration || 0;
            f.decorationThickness = f.decorationThickness || 0;
            f.fontSize = f.fontSize || 0;
            var p = f.fontStyle;
            p = p || {};
            void 0 === p.weight && (p.weight = m.FontWeight.Normal);
            p.width = p.width || m.FontWidth.Normal;
            p.slant = p.slant || m.FontSlant.Upright;
            f.fontStyle = p;
            return f;
          };
          var K = {},
            V = m._malloc(16),
            ba = m._malloc(16);
          m.ParagraphBuilder.Make = function (f, p) {
            E(f.textStyle);
            p = m.ParagraphBuilder._Make(f, p);
            m._free(f.textStyle._fontFamiliesPtr);
            return p;
          };
          m.ParagraphBuilder.prototype.pushStyle = function (f) {
            E(f);
            this._pushStyle(f);
            m._free(f._fontFamiliesPtr);
          };
        });
      })(g);
      a.yk = a.yk || [];
      a.yk.push(function () {
        a.SkCanvas.prototype.drawText = function (m, w, E, K, V) {
          if ("string" === typeof m) {
            var ba = ea(m),
              f = a._malloc(ba + 1);
            fa(m, f, ba + 1);
            this._drawSimpleText(f, ba, w, E, V, K);
          } else this._drawShapedText(m, w, E, K);
        };
        a.SkFont.prototype.getWidths = function (m) {
          var w = m.length + 1,
            E = ea(m) + 1,
            K = a._malloc(E);
          fa(m, K, E);
          m = a._malloc(4 * w);
          if (!this._getWidths(K, E, w, m)) return a._free(K), a._free(m), null;
          w = new Float32Array(a.HEAPU8.buffer, m, w);
          w = Array.from(w);
          a._free(K);
          a._free(m);
          return w;
        };
        a.SkFontMgr.FromData = function () {
          if (!arguments.length) return null;
          var m = arguments;
          1 === m.length && Array.isArray(m[0]) && (m = arguments[0]);
          if (!m.length) return null;
          for (var w = [], E = [], K = 0; K < m.length; K++) {
            var V = new Uint8Array(m[K]),
              ba = h(V, "HEAPU8");
            w.push(ba);
            E.push(V.byteLength);
          }
          w = h(w, "HEAPU32");
          E = h(E, "HEAPU32");
          m = a.SkFontMgr._fromData(w, E, m.length);
          a._free(w);
          a._free(E);
          return m;
        };
        a.SkFontMgr.prototype.MakeTypefaceFromData = function (m) {
          m = new Uint8Array(m);
          var w = h(m, "HEAPU8");
          return (m = this._makeTypefaceFromData(w, m.byteLength)) ? m : null;
        };
        a.SkTextBlob.MakeOnPath = function (m, w, E, K) {
          if (m && m.length && w && w.countPoints()) {
            if (1 === w.countPoints()) return this.MakeFromText(m, E);
            K || (K = 0);
            var V = E.getWidths(m),
              ba = new a.RSXFormBuilder();
            w = new a.SkPathMeasure(w, !1, 1);
            for (var f = 0; f < m.length; f++) {
              var p = V[f];
              K += p / 2;
              if (K > w.getLength()) {
                if (!w.nextContour()) {
                  m = m.substring(0, f);
                  break;
                }
                K = p / 2;
              }
              var t = w.getPosTan(K),
                z = t[2],
                F = t[3];
              ba.push(z, F, t[0] - (p / 2) * z, t[1] - (p / 2) * F);
              K += p / 2;
            }
            m = this.MakeFromRSXform(m, ba, E);
            ba.delete();
            w.delete();
            return m;
          }
        };
        a.SkTextBlob.MakeFromRSXform = function (m, w, E) {
          var K = ea(m) + 1,
            V = a._malloc(K);
          fa(m, V, K);
          m = w.build();
          E = a.SkTextBlob._MakeFromRSXform(V, K - 1, m, E);
          if (!E) return null;
          var ba = E.delete.bind(E);
          E.delete = function () {
            a._free(V);
            ba();
          };
          return E;
        };
        a.SkTextBlob.MakeFromText = function (m, w) {
          var E = ea(m) + 1,
            K = a._malloc(E);
          fa(m, K, E);
          m = a.SkTextBlob._MakeFromText(K, E - 1, w);
          if (!m) return null;
          var V = m.delete.bind(m);
          m.delete = function () {
            a._free(K);
            V();
          };
          return m;
        };
      });
      (function () {
        function m(J) {
          for (var l = 0; l < J.length; l++)
            if (void 0 !== J[l] && !Number.isFinite(J[l])) return !1;
          return !0;
        }
        function w(J) {
          var l = a.getColorComponents(J);
          J = l[0];
          var r = l[1],
            y = l[2];
          l = l[3];
          if (1 === l)
            return (
              (J = J.toString(16).toLowerCase()),
              (r = r.toString(16).toLowerCase()),
              (y = y.toString(16).toLowerCase()),
              (J = 1 === J.length ? "0" + J : J),
              (r = 1 === r.length ? "0" + r : r),
              (y = 1 === y.length ? "0" + y : y),
              "#" + J + r + y
            );
          l = 0 === l || 1 === l ? l : l.toFixed(8);
          return "rgba(" + J + ", " + r + ", " + y + ", " + l + ")";
        }
        function E(J) {
          return a.parseColorString(J, ra);
        }
        function K(J) {
          J = sa.exec(J);
          if (!J) return null;
          var l = parseFloat(J[4]),
            r = 16;
          switch (J[5]) {
            case "em":
            case "rem":
              r = 16 * l;
              break;
            case "pt":
              r = (4 * l) / 3;
              break;
            case "px":
              r = l;
              break;
            case "pc":
              r = 16 * l;
              break;
            case "in":
              r = 96 * l;
              break;
            case "cm":
              r = (96 * l) / 2.54;
              break;
            case "mm":
              r = (96 / 25.4) * l;
              break;
            case "q":
              r = (96 / 25.4 / 4) * l;
              break;
            case "%":
              r = (16 / 75) * l;
          }
          return {
            style: J[1],
            variant: J[2],
            weight: J[3],
            sizePx: r,
            family: J[6].trim(),
          };
        }
        function V(J) {
          this.jk = J;
          this.lk = new a.SkPaint();
          this.lk.setAntiAlias(!0);
          this.lk.setStrokeMiter(10);
          this.lk.setStrokeCap(a.StrokeCap.Butt);
          this.lk.setStrokeJoin(a.StrokeJoin.Miter);
          this.vl = "10px monospace";
          this.Pk = new a.SkFont(null, 10);
          this.Pk.setSubpixel(!0);
          this.Ak = this.Hk = a.BLACK;
          this.Zk = 0;
          this.nl = a.TRANSPARENT;
          this.al = this.$k = 0;
          this.ol = this.Lk = 1;
          this.ml = 0;
          this.Yk = [];
          this.kk = a.BlendMode.SrcOver;
          this.Qk = a.FilterQuality.Low;
          this.ll = !0;
          this.lk.setStrokeWidth(this.ol);
          this.lk.setBlendMode(this.kk);
          this.nk = new a.SkPath();
          this.qk = a.SkMatrix.identity();
          this.Tl = [];
          this.el = [];
          this.Mk = function () {
            this.nk.delete();
            this.lk.delete();
            this.Pk.delete();
            this.el.forEach(function (l) {
              l.Mk();
            });
          };
          Object.defineProperty(this, "currentTransform", {
            enumerable: !0,
            get: function () {
              return {
                a: this.qk[0],
                c: this.qk[1],
                e: this.qk[2],
                b: this.qk[3],
                d: this.qk[4],
                f: this.qk[5],
              };
            },
            set: function (l) {
              l.a && this.setTransform(l.a, l.b, l.c, l.d, l.e, l.f);
            },
          });
          Object.defineProperty(this, "fillStyle", {
            enumerable: !0,
            get: function () {
              return c(this.Ak) ? w(this.Ak) : this.Ak;
            },
            set: function (l) {
              "string" === typeof l ? (this.Ak = E(l)) : l.Xk && (this.Ak = l);
            },
          });
          Object.defineProperty(this, "font", {
            enumerable: !0,
            get: function () {
              return this.vl;
            },
            set: function (l) {
              var r = K(l),
                y = r.family;
              r.typeface = ta[y]
                ? ta[y][
                    (r.style || "normal") +
                      "|" +
                      (r.variant || "normal") +
                      "|" +
                      (r.weight || "normal")
                  ] || ta[y]["*"]
                : null;
              r &&
                (this.Pk.setSize(r.sizePx),
                this.Pk.setTypeface(r.typeface),
                (this.vl = l));
            },
          });
          Object.defineProperty(this, "globalAlpha", {
            enumerable: !0,
            get: function () {
              return this.Lk;
            },
            set: function (l) {
              !isFinite(l) || 0 > l || 1 < l || (this.Lk = l);
            },
          });
          Object.defineProperty(this, "globalCompositeOperation", {
            enumerable: !0,
            get: function () {
              switch (this.kk) {
                case a.BlendMode.SrcOver:
                  return "source-over";
                case a.BlendMode.DstOver:
                  return "destination-over";
                case a.BlendMode.Src:
                  return "copy";
                case a.BlendMode.Dst:
                  return "destination";
                case a.BlendMode.Clear:
                  return "clear";
                case a.BlendMode.SrcIn:
                  return "source-in";
                case a.BlendMode.DstIn:
                  return "destination-in";
                case a.BlendMode.SrcOut:
                  return "source-out";
                case a.BlendMode.DstOut:
                  return "destination-out";
                case a.BlendMode.SrcATop:
                  return "source-atop";
                case a.BlendMode.DstATop:
                  return "destination-atop";
                case a.BlendMode.Xor:
                  return "xor";
                case a.BlendMode.Plus:
                  return "lighter";
                case a.BlendMode.Multiply:
                  return "multiply";
                case a.BlendMode.Screen:
                  return "screen";
                case a.BlendMode.Overlay:
                  return "overlay";
                case a.BlendMode.Darken:
                  return "darken";
                case a.BlendMode.Lighten:
                  return "lighten";
                case a.BlendMode.ColorDodge:
                  return "color-dodge";
                case a.BlendMode.ColorBurn:
                  return "color-burn";
                case a.BlendMode.HardLight:
                  return "hard-light";
                case a.BlendMode.SoftLight:
                  return "soft-light";
                case a.BlendMode.Difference:
                  return "difference";
                case a.BlendMode.Exclusion:
                  return "exclusion";
                case a.BlendMode.Hue:
                  return "hue";
                case a.BlendMode.Saturation:
                  return "saturation";
                case a.BlendMode.Color:
                  return "color";
                case a.BlendMode.Luminosity:
                  return "luminosity";
              }
            },
            set: function (l) {
              switch (l) {
                case "source-over":
                  this.kk = a.BlendMode.SrcOver;
                  break;
                case "destination-over":
                  this.kk = a.BlendMode.DstOver;
                  break;
                case "copy":
                  this.kk = a.BlendMode.Src;
                  break;
                case "destination":
                  this.kk = a.BlendMode.Dst;
                  break;
                case "clear":
                  this.kk = a.BlendMode.Clear;
                  break;
                case "source-in":
                  this.kk = a.BlendMode.SrcIn;
                  break;
                case "destination-in":
                  this.kk = a.BlendMode.DstIn;
                  break;
                case "source-out":
                  this.kk = a.BlendMode.SrcOut;
                  break;
                case "destination-out":
                  this.kk = a.BlendMode.DstOut;
                  break;
                case "source-atop":
                  this.kk = a.BlendMode.SrcATop;
                  break;
                case "destination-atop":
                  this.kk = a.BlendMode.DstATop;
                  break;
                case "xor":
                  this.kk = a.BlendMode.Xor;
                  break;
                case "lighter":
                  this.kk = a.BlendMode.Plus;
                  break;
                case "plus-lighter":
                  this.kk = a.BlendMode.Plus;
                  break;
                case "plus-darker":
                  throw "plus-darker is not supported";
                case "multiply":
                  this.kk = a.BlendMode.Multiply;
                  break;
                case "screen":
                  this.kk = a.BlendMode.Screen;
                  break;
                case "overlay":
                  this.kk = a.BlendMode.Overlay;
                  break;
                case "darken":
                  this.kk = a.BlendMode.Darken;
                  break;
                case "lighten":
                  this.kk = a.BlendMode.Lighten;
                  break;
                case "color-dodge":
                  this.kk = a.BlendMode.ColorDodge;
                  break;
                case "color-burn":
                  this.kk = a.BlendMode.ColorBurn;
                  break;
                case "hard-light":
                  this.kk = a.BlendMode.HardLight;
                  break;
                case "soft-light":
                  this.kk = a.BlendMode.SoftLight;
                  break;
                case "difference":
                  this.kk = a.BlendMode.Difference;
                  break;
                case "exclusion":
                  this.kk = a.BlendMode.Exclusion;
                  break;
                case "hue":
                  this.kk = a.BlendMode.Hue;
                  break;
                case "saturation":
                  this.kk = a.BlendMode.Saturation;
                  break;
                case "color":
                  this.kk = a.BlendMode.Color;
                  break;
                case "luminosity":
                  this.kk = a.BlendMode.Luminosity;
                  break;
                default:
                  return;
              }
              this.lk.setBlendMode(this.kk);
            },
          });
          Object.defineProperty(this, "imageSmoothingEnabled", {
            enumerable: !0,
            get: function () {
              return this.ll;
            },
            set: function (l) {
              this.ll = !!l;
            },
          });
          Object.defineProperty(this, "imageSmoothingQuality", {
            enumerable: !0,
            get: function () {
              switch (this.Qk) {
                case a.FilterQuality.Low:
                  return "low";
                case a.FilterQuality.Medium:
                  return "medium";
                case a.FilterQuality.High:
                  return "high";
              }
            },
            set: function (l) {
              switch (l) {
                case "low":
                  this.Qk = a.FilterQuality.Low;
                  break;
                case "medium":
                  this.Qk = a.FilterQuality.Medium;
                  break;
                case "high":
                  this.Qk = a.FilterQuality.High;
              }
            },
          });
          Object.defineProperty(this, "lineCap", {
            enumerable: !0,
            get: function () {
              switch (this.lk.getStrokeCap()) {
                case a.StrokeCap.Butt:
                  return "butt";
                case a.StrokeCap.Round:
                  return "round";
                case a.StrokeCap.Square:
                  return "square";
              }
            },
            set: function (l) {
              switch (l) {
                case "butt":
                  this.lk.setStrokeCap(a.StrokeCap.Butt);
                  break;
                case "round":
                  this.lk.setStrokeCap(a.StrokeCap.Round);
                  break;
                case "square":
                  this.lk.setStrokeCap(a.StrokeCap.Square);
              }
            },
          });
          Object.defineProperty(this, "lineDashOffset", {
            enumerable: !0,
            get: function () {
              return this.ml;
            },
            set: function (l) {
              isFinite(l) && (this.ml = l);
            },
          });
          Object.defineProperty(this, "lineJoin", {
            enumerable: !0,
            get: function () {
              switch (this.lk.getStrokeJoin()) {
                case a.StrokeJoin.Miter:
                  return "miter";
                case a.StrokeJoin.Round:
                  return "round";
                case a.StrokeJoin.Bevel:
                  return "bevel";
              }
            },
            set: function (l) {
              switch (l) {
                case "miter":
                  this.lk.setStrokeJoin(a.StrokeJoin.Miter);
                  break;
                case "round":
                  this.lk.setStrokeJoin(a.StrokeJoin.Round);
                  break;
                case "bevel":
                  this.lk.setStrokeJoin(a.StrokeJoin.Bevel);
              }
            },
          });
          Object.defineProperty(this, "lineWidth", {
            enumerable: !0,
            get: function () {
              return this.lk.getStrokeWidth();
            },
            set: function (l) {
              0 >= l || !l || ((this.ol = l), this.lk.setStrokeWidth(l));
            },
          });
          Object.defineProperty(this, "miterLimit", {
            enumerable: !0,
            get: function () {
              return this.lk.getStrokeMiter();
            },
            set: function (l) {
              0 >= l || !l || this.lk.setStrokeMiter(l);
            },
          });
          Object.defineProperty(this, "shadowBlur", {
            enumerable: !0,
            get: function () {
              return this.Zk;
            },
            set: function (l) {
              0 > l || !isFinite(l) || (this.Zk = l);
            },
          });
          Object.defineProperty(this, "shadowColor", {
            enumerable: !0,
            get: function () {
              return w(this.nl);
            },
            set: function (l) {
              this.nl = E(l);
            },
          });
          Object.defineProperty(this, "shadowOffsetX", {
            enumerable: !0,
            get: function () {
              return this.$k;
            },
            set: function (l) {
              isFinite(l) && (this.$k = l);
            },
          });
          Object.defineProperty(this, "shadowOffsetY", {
            enumerable: !0,
            get: function () {
              return this.al;
            },
            set: function (l) {
              isFinite(l) && (this.al = l);
            },
          });
          Object.defineProperty(this, "strokeStyle", {
            enumerable: !0,
            get: function () {
              return w(this.Hk);
            },
            set: function (l) {
              "string" === typeof l ? (this.Hk = E(l)) : l.Xk && (this.Hk = l);
            },
          });
          this.arc = function (l, r, y, B, D, H) {
            I(this.nk, l, r, y, y, 0, B, D, H);
          };
          this.arcTo = function (l, r, y, B, D) {
            t(this.nk, l, r, y, B, D);
          };
          this.beginPath = function () {
            this.nk.delete();
            this.nk = new a.SkPath();
          };
          this.bezierCurveTo = function (l, r, y, B, D, H) {
            var O = this.nk;
            m([l, r, y, B, D, H]) &&
              (O.isEmpty() && O.moveTo(l, r), O.cubicTo(l, r, y, B, D, H));
          };
          this.clearRect = function (l, r, y, B) {
            this.lk.setStyle(a.PaintStyle.Fill);
            this.lk.setBlendMode(a.BlendMode.Clear);
            this.jk.drawRect(a.XYWHRect(l, r, y, B), this.lk);
            this.lk.setBlendMode(this.kk);
          };
          this.clip = function (l, r) {
            "string" === typeof l
              ? ((r = l), (l = this.nk))
              : l && l.Fl && (l = l.sk);
            l || (l = this.nk);
            l = l.copy();
            r && "evenodd" === r.toLowerCase()
              ? l.setFillType(a.FillType.EvenOdd)
              : l.setFillType(a.FillType.Winding);
            this.jk.clipPath(l, a.ClipOp.Intersect, !0);
            l.delete();
          };
          this.closePath = function () {
            z(this.nk);
          };
          this.createImageData = function () {
            if (1 === arguments.length) {
              var l = arguments[0];
              return new f(
                new Uint8ClampedArray(4 * l.width * l.height),
                l.width,
                l.height
              );
            }
            if (2 === arguments.length) {
              l = arguments[0];
              var r = arguments[1];
              return new f(new Uint8ClampedArray(4 * l * r), l, r);
            }
            throw (
              "createImageData expects 1 or 2 arguments, got " +
              arguments.length
            );
          };
          this.createLinearGradient = function (l, r, y, B) {
            if (m(arguments)) {
              var D = new p(l, r, y, B);
              this.el.push(D);
              return D;
            }
          };
          this.createPattern = function (l, r) {
            l = new W(l, r);
            this.el.push(l);
            return l;
          };
          this.createRadialGradient = function (l, r, y, B, D, H) {
            if (m(arguments)) {
              var O = new X(l, r, y, B, D, H);
              this.el.push(O);
              return O;
            }
          };
          this.em = function () {
            var l = this.ul();
            this.ll
              ? l.setFilterQuality(this.Qk)
              : l.setFilterQuality(a.FilterQuality.None);
            return l;
          };
          this.drawImage = function (l) {
            var r = this.em();
            if (3 === arguments.length || 5 === arguments.length)
              var y = a.XYWHRect(
                  arguments[1],
                  arguments[2],
                  arguments[3] || l.width(),
                  arguments[4] || l.height()
                ),
                B = a.XYWHRect(0, 0, l.width(), l.height());
            else if (9 === arguments.length)
              (y = a.XYWHRect(
                arguments[5],
                arguments[6],
                arguments[7],
                arguments[8]
              )),
                (B = a.XYWHRect(
                  arguments[1],
                  arguments[2],
                  arguments[3],
                  arguments[4]
                ));
            else
              throw (
                "invalid number of args for drawImage, need 3, 5, or 9; got " +
                arguments.length
              );
            this.jk.drawImageRect(l, B, y, r, !1);
            r.dispose();
          };
          this.ellipse = function (l, r, y, B, D, H, O, ca) {
            I(this.nk, l, r, y, B, D, H, O, ca);
          };
          this.ul = function () {
            var l = this.lk.copy();
            l.setStyle(a.PaintStyle.Fill);
            if (c(this.Ak)) {
              var r = a.multiplyByAlpha(this.Ak, this.Lk);
              l.setColor(r);
            } else
              (r = this.Ak.Xk(this.qk)),
                l.setColor(a.Color(0, 0, 0, this.Lk)),
                l.setShader(r);
            l.dispose = function () {
              this.delete();
            };
            return l;
          };
          this.fill = function (l, r) {
            "string" === typeof l
              ? ((r = l), (l = this.nk))
              : l && l.Fl && (l = l.sk);
            if ("evenodd" === r) this.nk.setFillType(a.FillType.EvenOdd);
            else {
              if ("nonzero" !== r && r) throw "invalid fill rule";
              this.nk.setFillType(a.FillType.Winding);
            }
            l || (l = this.nk);
            r = this.ul();
            var y = this.bl(r);
            y &&
              (this.jk.save(),
              this.Vk(),
              this.jk.drawPath(l, y),
              this.jk.restore(),
              y.dispose());
            this.jk.drawPath(l, r);
            r.dispose();
          };
          this.fillRect = function (l, r, y, B) {
            var D = this.ul(),
              H = this.bl(D);
            H &&
              (this.jk.save(),
              this.Vk(),
              this.jk.drawRect(a.XYWHRect(l, r, y, B), H),
              this.jk.restore(),
              H.dispose());
            this.jk.drawRect(a.XYWHRect(l, r, y, B), D);
            D.dispose();
          };
          this.fillText = function (l, r, y) {
            var B = this.ul();
            l = a.SkTextBlob.MakeFromText(l, this.Pk);
            var D = this.bl(B);
            D &&
              (this.jk.save(),
              this.Vk(),
              this.jk.drawTextBlob(l, r, y, D),
              this.jk.restore(),
              D.dispose());
            this.jk.drawTextBlob(l, r, y, B);
            l.delete();
            B.dispose();
          };
          this.getImageData = function (l, r, y, B) {
            return (l = this.jk.readPixels(l, r, y, B))
              ? new f(new Uint8ClampedArray(l.buffer), y, B)
              : null;
          };
          this.getLineDash = function () {
            return this.Yk.slice();
          };
          this.Ul = function (l) {
            var r = a.SkMatrix.invert(this.qk);
            a.SkMatrix.mapPoints(r, l);
            return l;
          };
          this.isPointInPath = function (l, r, y) {
            var B = arguments;
            if (3 === B.length) var D = this.nk;
            else if (4 === B.length)
              (D = B[0]), (l = B[1]), (r = B[2]), (y = B[3]);
            else throw "invalid arg count, need 3 or 4, got " + B.length;
            if (!isFinite(l) || !isFinite(r)) return !1;
            y = y || "nonzero";
            if ("nonzero" !== y && "evenodd" !== y) return !1;
            B = this.Ul([l, r]);
            l = B[0];
            r = B[1];
            D.setFillType(
              "nonzero" === y ? a.FillType.Winding : a.FillType.EvenOdd
            );
            return D.contains(l, r);
          };
          this.isPointInStroke = function (l, r) {
            var y = arguments;
            if (2 === y.length) var B = this.nk;
            else if (3 === y.length) (B = y[0]), (l = y[1]), (r = y[2]);
            else throw "invalid arg count, need 2 or 3, got " + y.length;
            if (!isFinite(l) || !isFinite(r)) return !1;
            y = this.Ul([l, r]);
            l = y[0];
            r = y[1];
            B = B.copy();
            B.setFillType(a.FillType.Winding);
            B.stroke({
              width: this.lineWidth,
              miter_limit: this.miterLimit,
              cap: this.lk.getStrokeCap(),
              join: this.lk.getStrokeJoin(),
              precision: 0.3,
            });
            y = B.contains(l, r);
            B.delete();
            return y;
          };
          this.lineTo = function (l, r) {
            S(this.nk, l, r);
          };
          this.measureText = function (l) {
            return { width: this.Pk.measureText(l) };
          };
          this.moveTo = function (l, r) {
            var y = this.nk;
            m([l, r]) && y.moveTo(l, r);
          };
          this.putImageData = function (l, r, y, B, D, H, O) {
            if (m([r, y, B, D, H, O]))
              if (void 0 === B)
                this.jk.writePixels(l.data, l.width, l.height, r, y);
              else if (
                ((B = B || 0),
                (D = D || 0),
                (H = H || l.width),
                (O = O || l.height),
                0 > H && ((B += H), (H = Math.abs(H))),
                0 > O && ((D += O), (O = Math.abs(O))),
                0 > B && ((H += B), (B = 0)),
                0 > D && ((O += D), (D = 0)),
                !(0 >= H || 0 >= O))
              ) {
                l = a.MakeImage(
                  l.data,
                  l.width,
                  l.height,
                  a.AlphaType.Unpremul,
                  a.ColorType.RGBA_8888,
                  a.SkColorSpace.SRGB
                );
                var ca = a.XYWHRect(B, D, H, O);
                r = a.XYWHRect(r + B, y + D, H, O);
                y = a.SkMatrix.invert(this.qk);
                this.jk.save();
                this.jk.concat(y);
                this.jk.drawImageRect(l, ca, r, null, !1);
                this.jk.restore();
                l.delete();
              }
          };
          this.quadraticCurveTo = function (l, r, y, B) {
            var D = this.nk;
            m([l, r, y, B]) &&
              (D.isEmpty() && D.moveTo(l, r), D.quadTo(l, r, y, B));
          };
          this.rect = function (l, r, y, B) {
            var D = this.nk;
            m([l, r, y, B]) && D.addRect(l, r, l + y, r + B);
          };
          this.resetTransform = function () {
            this.nk.transform(this.qk);
            var l = a.SkMatrix.invert(this.qk);
            this.jk.concat(l);
            this.qk = this.jk.getTotalMatrix();
          };
          this.restore = function () {
            var l = this.Tl.pop();
            if (l) {
              var r = a.SkMatrix.multiply(this.qk, a.SkMatrix.invert(l.jm));
              this.nk.transform(r);
              this.lk.delete();
              this.lk = l.Fm;
              this.Yk = l.Am;
              this.ol = l.Qm;
              this.Hk = l.Pm;
              this.Ak = l.fs;
              this.$k = l.Nm;
              this.al = l.Om;
              this.Zk = l.Km;
              this.nl = l.Mm;
              this.Lk = l.om;
              this.kk = l.pm;
              this.ml = l.Bm;
              this.ll = l.ym;
              this.Qk = l.zm;
              this.vl = l.nm;
              this.jk.restore();
              this.qk = this.jk.getTotalMatrix();
            }
          };
          this.rotate = function (l) {
            if (isFinite(l)) {
              var r = a.SkMatrix.rotated(-l);
              this.nk.transform(r);
              this.jk.rotate((l / Math.PI) * 180, 0, 0);
              this.qk = this.jk.getTotalMatrix();
            }
          };
          this.save = function () {
            if (this.Ak.Wk) {
              var l = this.Ak.Wk();
              this.el.push(l);
            } else l = this.Ak;
            if (this.Hk.Wk) {
              var r = this.Hk.Wk();
              this.el.push(r);
            } else r = this.Hk;
            this.Tl.push({
              jm: this.qk.slice(),
              Am: this.Yk.slice(),
              Qm: this.ol,
              Pm: r,
              fs: l,
              Nm: this.$k,
              Om: this.al,
              Km: this.Zk,
              Mm: this.nl,
              om: this.Lk,
              Bm: this.ml,
              pm: this.kk,
              ym: this.ll,
              zm: this.Qk,
              Fm: this.lk.copy(),
              nm: this.vl,
            });
            this.jk.save();
          };
          this.scale = function (l, r) {
            if (m(arguments)) {
              var y = a.SkMatrix.scaled(1 / l, 1 / r);
              this.nk.transform(y);
              this.jk.scale(l, r);
              this.qk = this.jk.getTotalMatrix();
            }
          };
          this.setLineDash = function (l) {
            for (var r = 0; r < l.length; r++)
              if (!isFinite(l[r]) || 0 > l[r]) return;
            1 === l.length % 2 && Array.prototype.push.apply(l, l);
            this.Yk = l;
          };
          this.setTransform = function (l, r, y, B, D, H) {
            m(arguments) &&
              (this.resetTransform(), this.transform(l, r, y, B, D, H));
          };
          this.Vk = function () {
            var l = a.SkMatrix.invert(this.qk);
            this.jk.concat(l);
            this.jk.concat(a.SkMatrix.translated(this.$k, this.al));
            this.jk.concat(this.qk);
          };
          this.bl = function (l) {
            var r = a.multiplyByAlpha(this.nl, this.Lk);
            if (!a.getColorComponents(r)[3] || !(this.Zk || this.al || this.$k))
              return null;
            l = l.copy();
            l.setColor(r);
            var y = a.SkMaskFilter.MakeBlur(
              a.BlurStyle.Normal,
              this.Zk / 2,
              !1
            );
            l.setMaskFilter(y);
            l.dispose = function () {
              y.delete();
              this.delete();
            };
            return l;
          };
          this.Hl = function () {
            var l = this.lk.copy();
            l.setStyle(a.PaintStyle.Stroke);
            if (c(this.Hk)) {
              var r = a.multiplyByAlpha(this.Hk, this.Lk);
              l.setColor(r);
            } else
              (r = this.Hk.Xk(this.qk)),
                l.setColor(a.Color(0, 0, 0, this.Lk)),
                l.setShader(r);
            l.setStrokeWidth(this.ol);
            if (this.Yk.length) {
              var y = a.SkPathEffect.MakeDash(this.Yk, this.ml);
              l.setPathEffect(y);
            }
            l.dispose = function () {
              y && y.delete();
              this.delete();
            };
            return l;
          };
          this.stroke = function (l) {
            l = l ? l.sk : this.nk;
            var r = this.Hl(),
              y = this.bl(r);
            y &&
              (this.jk.save(),
              this.Vk(),
              this.jk.drawPath(l, y),
              this.jk.restore(),
              y.dispose());
            this.jk.drawPath(l, r);
            r.dispose();
          };
          this.strokeRect = function (l, r, y, B) {
            var D = this.Hl(),
              H = this.bl(D);
            H &&
              (this.jk.save(),
              this.Vk(),
              this.jk.drawRect(a.XYWHRect(l, r, y, B), H),
              this.jk.restore(),
              H.dispose());
            this.jk.drawRect(a.XYWHRect(l, r, y, B), D);
            D.dispose();
          };
          this.strokeText = function (l, r, y) {
            var B = this.Hl();
            l = a.SkTextBlob.MakeFromText(l, this.Pk);
            var D = this.bl(B);
            D &&
              (this.jk.save(),
              this.Vk(),
              this.jk.drawTextBlob(l, r, y, D),
              this.jk.restore(),
              D.dispose());
            this.jk.drawTextBlob(l, r, y, B);
            l.delete();
            B.dispose();
          };
          this.translate = function (l, r) {
            if (m(arguments)) {
              var y = a.SkMatrix.translated(-l, -r);
              this.nk.transform(y);
              this.jk.translate(l, r);
              this.qk = this.jk.getTotalMatrix();
            }
          };
          this.transform = function (l, r, y, B, D, H) {
            l = [l, y, D, r, B, H, 0, 0, 1];
            r = a.SkMatrix.invert(l);
            this.nk.transform(r);
            this.jk.concat(l);
            this.qk = this.jk.getTotalMatrix();
          };
          this.addHitRegion = function () {};
          this.clearHitRegions = function () {};
          this.drawFocusIfNeeded = function () {};
          this.removeHitRegion = function () {};
          this.scrollPathIntoView = function () {};
          Object.defineProperty(this, "canvas", { value: null, writable: !1 });
        }
        function ba(J) {
          this.Il = J;
          this.Ok = new V(J.getCanvas());
          this.wl = [];
          this.bm = a.SkFontMgr.RefDefault();
          this.decodeImage = function (l) {
            l = a.MakeImageFromEncoded(l);
            if (!l) throw "Invalid input";
            this.wl.push(l);
            return l;
          };
          this.loadFont = function (l, r) {
            l = this.bm.MakeTypefaceFromData(l);
            if (!l) return null;
            this.wl.push(l);
            var y =
              (r.style || "normal") +
              "|" +
              (r.variant || "normal") +
              "|" +
              (r.weight || "normal");
            r = r.family;
            ta[r] || (ta[r] = { "*": l });
            ta[r][y] = l;
          };
          this.makePath2D = function (l) {
            l = new T(l);
            this.wl.push(l.sk);
            return l;
          };
          this.getContext = function (l) {
            return "2d" === l ? this.Ok : null;
          };
          this.toDataURL = function (l, r) {
            this.Il.flush();
            var y = this.Il.makeImageSnapshot();
            if (y) {
              l = l || "image/png";
              var B = a.ImageFormat.PNG;
              "image/jpeg" === l && (B = a.ImageFormat.JPEG);
              if ((r = y.encodeToData(B, r || 0.92))) {
                r = a.getSkDataBytes(r);
                l = "data:" + l + ";base64,";
                if (P) r = Buffer.from(r).toString("base64");
                else {
                  y = 0;
                  B = r.length;
                  for (var D = "", H; y < B; )
                    (H = r.slice(y, Math.min(y + 32768, B))),
                      (D += String.fromCharCode.apply(null, H)),
                      (y += 32768);
                  r = btoa(D);
                }
                return l + r;
              }
            }
          };
          this.dispose = function () {
            this.Ok.Mk();
            this.wl.forEach(function (l) {
              l.delete();
            });
            this.Il.dispose();
          };
        }
        function f(J, l, r) {
          if (!l || 0 === r)
            throw "invalid dimensions, width and height must be non-zero";
          if (J.length % 4) throw "arr must be a multiple of 4";
          r = r || J.length / (4 * l);
          Object.defineProperty(this, "data", { value: J, writable: !1 });
          Object.defineProperty(this, "height", { value: r, writable: !1 });
          Object.defineProperty(this, "width", { value: l, writable: !1 });
        }
        function p(J, l, r, y) {
          this.uk = null;
          this.Dk = [];
          this.xk = [];
          this.addColorStop = function (B, D) {
            if (0 > B || 1 < B || !isFinite(B))
              throw "offset must be between 0 and 1 inclusively";
            D = E(D);
            var H = this.xk.indexOf(B);
            if (-1 !== H) this.Dk[H] = D;
            else {
              for (H = 0; H < this.xk.length && !(this.xk[H] > B); H++);
              this.xk.splice(H, 0, B);
              this.Dk.splice(H, 0, D);
            }
          };
          this.Wk = function () {
            var B = new p(J, l, r, y);
            B.Dk = this.Dk.slice();
            B.xk = this.xk.slice();
            return B;
          };
          this.Mk = function () {
            this.uk && (this.uk.delete(), (this.uk = null));
          };
          this.Xk = function (B) {
            var D = [J, l, r, y];
            a.SkMatrix.mapPoints(B, D);
            B = D[0];
            var H = D[1],
              O = D[2];
            D = D[3];
            this.Mk();
            return (this.uk = a.SkShader.MakeLinearGradient(
              [B, H],
              [O, D],
              this.Dk,
              this.xk,
              a.TileMode.Clamp
            ));
          };
        }
        function t(J, l, r, y, B, D) {
          if (m([l, r, y, B, D])) {
            if (0 > D) throw "radii cannot be negative";
            J.isEmpty() && J.moveTo(l, r);
            J.arcTo(l, r, y, B, D);
          }
        }
        function z(J) {
          if (!J.isEmpty()) {
            var l = J.getBounds();
            (l.fBottom - l.fTop || l.fRight - l.fLeft) && J.close();
          }
        }
        function F(J, l, r, y, B, D, H) {
          H = ((H - D) / Math.PI) * 180;
          D = (D / Math.PI) * 180;
          l = a.LTRBRect(l - y, r - B, l + y, r + B);
          1e-5 > Math.abs(Math.abs(H) - 360)
            ? ((r = H / 2), J.arcTo(l, D, r, !1), J.arcTo(l, D + r, r, !1))
            : J.arcTo(l, D, H, !1);
        }
        function I(J, l, r, y, B, D, H, O, ca) {
          if (m([l, r, y, B, D, H, O])) {
            if (0 > y || 0 > B) throw "radii cannot be negative";
            var ka = 2 * Math.PI,
              ua = H % ka;
            0 > ua && (ua += ka);
            var va = ua - H;
            H = ua;
            O += va;
            !ca && O - H >= ka
              ? (O = H + ka)
              : ca && H - O >= ka
              ? (O = H - ka)
              : !ca && H > O
              ? (O = H + (ka - ((H - O) % ka)))
              : ca && H < O && (O = H - (ka - ((O - H) % ka)));
            D
              ? ((ca = a.SkMatrix.rotated(D, l, r)),
                (D = a.SkMatrix.rotated(-D, l, r)),
                J.transform(D),
                F(J, l, r, y, B, H, O),
                J.transform(ca))
              : F(J, l, r, y, B, H, O);
          }
        }
        function S(J, l, r) {
          m([l, r]) && (J.isEmpty() && J.moveTo(l, r), J.lineTo(l, r));
        }
        function T(J) {
          this.sk = null;
          "string" === typeof J
            ? (this.sk = a.MakePathFromSVGString(J))
            : J && J.Fl
            ? (this.sk = J.sk.copy())
            : (this.sk = new a.SkPath());
          this.Fl = function () {
            return this.sk;
          };
          this.addPath = function (l, r) {
            r || (r = { a: 1, c: 0, e: 0, b: 0, d: 1, f: 0 });
            this.sk.addPath(l.sk, [r.a, r.c, r.e, r.b, r.d, r.f]);
          };
          this.arc = function (l, r, y, B, D, H) {
            I(this.sk, l, r, y, y, 0, B, D, H);
          };
          this.arcTo = function (l, r, y, B, D) {
            t(this.sk, l, r, y, B, D);
          };
          this.bezierCurveTo = function (l, r, y, B, D, H) {
            var O = this.sk;
            m([l, r, y, B, D, H]) &&
              (O.isEmpty() && O.moveTo(l, r), O.cubicTo(l, r, y, B, D, H));
          };
          this.closePath = function () {
            z(this.sk);
          };
          this.ellipse = function (l, r, y, B, D, H, O, ca) {
            I(this.sk, l, r, y, B, D, H, O, ca);
          };
          this.lineTo = function (l, r) {
            S(this.sk, l, r);
          };
          this.moveTo = function (l, r) {
            var y = this.sk;
            m([l, r]) && y.moveTo(l, r);
          };
          this.quadraticCurveTo = function (l, r, y, B) {
            var D = this.sk;
            m([l, r, y, B]) &&
              (D.isEmpty() && D.moveTo(l, r), D.quadTo(l, r, y, B));
          };
          this.rect = function (l, r, y, B) {
            var D = this.sk;
            m([l, r, y, B]) && D.addRect(l, r, l + y, r + B);
          };
        }
        function W(J, l) {
          this.uk = null;
          this.dm = J;
          this._transform = a.SkMatrix.identity();
          "" === l && (l = "repeat");
          switch (l) {
            case "repeat-x":
              this.cl = a.TileMode.Repeat;
              this.dl = a.TileMode.Decal;
              break;
            case "repeat-y":
              this.cl = a.TileMode.Decal;
              this.dl = a.TileMode.Repeat;
              break;
            case "repeat":
              this.dl = this.cl = a.TileMode.Repeat;
              break;
            case "no-repeat":
              this.dl = this.cl = a.TileMode.Decal;
              break;
            default:
              throw "invalid repetition mode " + l;
          }
          this.setTransform = function (r) {
            r = [r.a, r.c, r.e, r.b, r.d, r.f, 0, 0, 1];
            m(r) && (this._transform = r);
          };
          this.Wk = function () {
            var r = new W();
            r.cl = this.cl;
            r.dl = this.dl;
            return r;
          };
          this.Mk = function () {
            this.uk && (this.uk.delete(), (this.uk = null));
          };
          this.Xk = function () {
            this.Mk();
            return (this.uk = this.dm.makeShader(
              this.cl,
              this.dl,
              this._transform
            ));
          };
        }
        function X(J, l, r, y, B, D) {
          this.uk = null;
          this.Dk = [];
          this.xk = [];
          this.addColorStop = function (H, O) {
            if (0 > H || 1 < H || !isFinite(H))
              throw "offset must be between 0 and 1 inclusively";
            O = E(O);
            var ca = this.xk.indexOf(H);
            if (-1 !== ca) this.Dk[ca] = O;
            else {
              for (ca = 0; ca < this.xk.length && !(this.xk[ca] > H); ca++);
              this.xk.splice(ca, 0, H);
              this.Dk.splice(ca, 0, O);
            }
          };
          this.Wk = function () {
            var H = new X(J, l, r, y, B, D);
            H.Dk = this.Dk.slice();
            H.xk = this.xk.slice();
            return H;
          };
          this.Mk = function () {
            this.uk && (this.uk.delete(), (this.uk = null));
          };
          this.Xk = function (H) {
            var O = [J, l, y, B];
            a.SkMatrix.mapPoints(H, O);
            var ca = O[0],
              ka = O[1],
              ua = O[2];
            O = O[3];
            var va = (Math.abs(H[0]) + Math.abs(H[4])) / 2;
            H = r * va;
            va *= D;
            this.Mk();
            return (this.uk = a.SkShader.MakeTwoPointConicalGradient(
              [ca, ka],
              H,
              [ua, O],
              va,
              this.Dk,
              this.xk,
              a.TileMode.Clamp
            ));
          };
        }
        a._testing = {};
        var ra = {
          aliceblue: Float32Array.of(0.941, 0.973, 1, 1),
          antiquewhite: Float32Array.of(0.98, 0.922, 0.843, 1),
          aqua: Float32Array.of(0, 1, 1, 1),
          aquamarine: Float32Array.of(0.498, 1, 0.831, 1),
          azure: Float32Array.of(0.941, 1, 1, 1),
          beige: Float32Array.of(0.961, 0.961, 0.863, 1),
          bisque: Float32Array.of(1, 0.894, 0.769, 1),
          black: Float32Array.of(0, 0, 0, 1),
          blanchedalmond: Float32Array.of(1, 0.922, 0.804, 1),
          blue: Float32Array.of(0, 0, 1, 1),
          blueviolet: Float32Array.of(0.541, 0.169, 0.886, 1),
          brown: Float32Array.of(0.647, 0.165, 0.165, 1),
          burlywood: Float32Array.of(0.871, 0.722, 0.529, 1),
          cadetblue: Float32Array.of(0.373, 0.62, 0.627, 1),
          chartreuse: Float32Array.of(0.498, 1, 0, 1),
          chocolate: Float32Array.of(0.824, 0.412, 0.118, 1),
          coral: Float32Array.of(1, 0.498, 0.314, 1),
          cornflowerblue: Float32Array.of(0.392, 0.584, 0.929, 1),
          cornsilk: Float32Array.of(1, 0.973, 0.863, 1),
          crimson: Float32Array.of(0.863, 0.078, 0.235, 1),
          cyan: Float32Array.of(0, 1, 1, 1),
          darkblue: Float32Array.of(0, 0, 0.545, 1),
          darkcyan: Float32Array.of(0, 0.545, 0.545, 1),
          darkgoldenrod: Float32Array.of(0.722, 0.525, 0.043, 1),
          darkgray: Float32Array.of(0.663, 0.663, 0.663, 1),
          darkgreen: Float32Array.of(0, 0.392, 0, 1),
          darkgrey: Float32Array.of(0.663, 0.663, 0.663, 1),
          darkkhaki: Float32Array.of(0.741, 0.718, 0.42, 1),
          darkmagenta: Float32Array.of(0.545, 0, 0.545, 1),
          darkolivegreen: Float32Array.of(0.333, 0.42, 0.184, 1),
          darkorange: Float32Array.of(1, 0.549, 0, 1),
          darkorchid: Float32Array.of(0.6, 0.196, 0.8, 1),
          darkred: Float32Array.of(0.545, 0, 0, 1),
          darksalmon: Float32Array.of(0.914, 0.588, 0.478, 1),
          darkseagreen: Float32Array.of(0.561, 0.737, 0.561, 1),
          darkslateblue: Float32Array.of(0.282, 0.239, 0.545, 1),
          darkslategray: Float32Array.of(0.184, 0.31, 0.31, 1),
          darkslategrey: Float32Array.of(0.184, 0.31, 0.31, 1),
          darkturquoise: Float32Array.of(0, 0.808, 0.82, 1),
          darkviolet: Float32Array.of(0.58, 0, 0.827, 1),
          deeppink: Float32Array.of(1, 0.078, 0.576, 1),
          deepskyblue: Float32Array.of(0, 0.749, 1, 1),
          dimgray: Float32Array.of(0.412, 0.412, 0.412, 1),
          dimgrey: Float32Array.of(0.412, 0.412, 0.412, 1),
          dodgerblue: Float32Array.of(0.118, 0.565, 1, 1),
          firebrick: Float32Array.of(0.698, 0.133, 0.133, 1),
          floralwhite: Float32Array.of(1, 0.98, 0.941, 1),
          forestgreen: Float32Array.of(0.133, 0.545, 0.133, 1),
          fuchsia: Float32Array.of(1, 0, 1, 1),
          gainsboro: Float32Array.of(0.863, 0.863, 0.863, 1),
          ghostwhite: Float32Array.of(0.973, 0.973, 1, 1),
          gold: Float32Array.of(1, 0.843, 0, 1),
          goldenrod: Float32Array.of(0.855, 0.647, 0.125, 1),
          gray: Float32Array.of(0.502, 0.502, 0.502, 1),
          green: Float32Array.of(0, 0.502, 0, 1),
          greenyellow: Float32Array.of(0.678, 1, 0.184, 1),
          grey: Float32Array.of(0.502, 0.502, 0.502, 1),
          honeydew: Float32Array.of(0.941, 1, 0.941, 1),
          hotpink: Float32Array.of(1, 0.412, 0.706, 1),
          indianred: Float32Array.of(0.804, 0.361, 0.361, 1),
          indigo: Float32Array.of(0.294, 0, 0.51, 1),
          ivory: Float32Array.of(1, 1, 0.941, 1),
          khaki: Float32Array.of(0.941, 0.902, 0.549, 1),
          lavender: Float32Array.of(0.902, 0.902, 0.98, 1),
          lavenderblush: Float32Array.of(1, 0.941, 0.961, 1),
          lawngreen: Float32Array.of(0.486, 0.988, 0, 1),
          lemonchiffon: Float32Array.of(1, 0.98, 0.804, 1),
          lightblue: Float32Array.of(0.678, 0.847, 0.902, 1),
          lightcoral: Float32Array.of(0.941, 0.502, 0.502, 1),
          lightcyan: Float32Array.of(0.878, 1, 1, 1),
          lightgoldenrodyellow: Float32Array.of(0.98, 0.98, 0.824, 1),
          lightgray: Float32Array.of(0.827, 0.827, 0.827, 1),
          lightgreen: Float32Array.of(0.565, 0.933, 0.565, 1),
          lightgrey: Float32Array.of(0.827, 0.827, 0.827, 1),
          lightpink: Float32Array.of(1, 0.714, 0.757, 1),
          lightsalmon: Float32Array.of(1, 0.627, 0.478, 1),
          lightseagreen: Float32Array.of(0.125, 0.698, 0.667, 1),
          lightskyblue: Float32Array.of(0.529, 0.808, 0.98, 1),
          lightslategray: Float32Array.of(0.467, 0.533, 0.6, 1),
          lightslategrey: Float32Array.of(0.467, 0.533, 0.6, 1),
          lightsteelblue: Float32Array.of(0.69, 0.769, 0.871, 1),
          lightyellow: Float32Array.of(1, 1, 0.878, 1),
          lime: Float32Array.of(0, 1, 0, 1),
          limegreen: Float32Array.of(0.196, 0.804, 0.196, 1),
          linen: Float32Array.of(0.98, 0.941, 0.902, 1),
          magenta: Float32Array.of(1, 0, 1, 1),
          maroon: Float32Array.of(0.502, 0, 0, 1),
          mediumaquamarine: Float32Array.of(0.4, 0.804, 0.667, 1),
          mediumblue: Float32Array.of(0, 0, 0.804, 1),
          mediumorchid: Float32Array.of(0.729, 0.333, 0.827, 1),
          mediumpurple: Float32Array.of(0.576, 0.439, 0.859, 1),
          mediumseagreen: Float32Array.of(0.235, 0.702, 0.443, 1),
          mediumslateblue: Float32Array.of(0.482, 0.408, 0.933, 1),
          mediumspringgreen: Float32Array.of(0, 0.98, 0.604, 1),
          mediumturquoise: Float32Array.of(0.282, 0.82, 0.8, 1),
          mediumvioletred: Float32Array.of(0.78, 0.082, 0.522, 1),
          midnightblue: Float32Array.of(0.098, 0.098, 0.439, 1),
          mintcream: Float32Array.of(0.961, 1, 0.98, 1),
          mistyrose: Float32Array.of(1, 0.894, 0.882, 1),
          moccasin: Float32Array.of(1, 0.894, 0.71, 1),
          navajowhite: Float32Array.of(1, 0.871, 0.678, 1),
          navy: Float32Array.of(0, 0, 0.502, 1),
          oldlace: Float32Array.of(0.992, 0.961, 0.902, 1),
          olive: Float32Array.of(0.502, 0.502, 0, 1),
          olivedrab: Float32Array.of(0.42, 0.557, 0.137, 1),
          orange: Float32Array.of(1, 0.647, 0, 1),
          orangered: Float32Array.of(1, 0.271, 0, 1),
          orchid: Float32Array.of(0.855, 0.439, 0.839, 1),
          palegoldenrod: Float32Array.of(0.933, 0.91, 0.667, 1),
          palegreen: Float32Array.of(0.596, 0.984, 0.596, 1),
          paleturquoise: Float32Array.of(0.686, 0.933, 0.933, 1),
          palevioletred: Float32Array.of(0.859, 0.439, 0.576, 1),
          papayawhip: Float32Array.of(1, 0.937, 0.835, 1),
          peachpuff: Float32Array.of(1, 0.855, 0.725, 1),
          peru: Float32Array.of(0.804, 0.522, 0.247, 1),
          pink: Float32Array.of(1, 0.753, 0.796, 1),
          plum: Float32Array.of(0.867, 0.627, 0.867, 1),
          powderblue: Float32Array.of(0.69, 0.878, 0.902, 1),
          purple: Float32Array.of(0.502, 0, 0.502, 1),
          rebeccapurple: Float32Array.of(0.4, 0.2, 0.6, 1),
          red: Float32Array.of(1, 0, 0, 1),
          rosybrown: Float32Array.of(0.737, 0.561, 0.561, 1),
          royalblue: Float32Array.of(0.255, 0.412, 0.882, 1),
          saddlebrown: Float32Array.of(0.545, 0.271, 0.075, 1),
          salmon: Float32Array.of(0.98, 0.502, 0.447, 1),
          sandybrown: Float32Array.of(0.957, 0.643, 0.376, 1),
          seagreen: Float32Array.of(0.18, 0.545, 0.341, 1),
          seashell: Float32Array.of(1, 0.961, 0.933, 1),
          sienna: Float32Array.of(0.627, 0.322, 0.176, 1),
          silver: Float32Array.of(0.753, 0.753, 0.753, 1),
          skyblue: Float32Array.of(0.529, 0.808, 0.922, 1),
          slateblue: Float32Array.of(0.416, 0.353, 0.804, 1),
          slategray: Float32Array.of(0.439, 0.502, 0.565, 1),
          slategrey: Float32Array.of(0.439, 0.502, 0.565, 1),
          snow: Float32Array.of(1, 0.98, 0.98, 1),
          springgreen: Float32Array.of(0, 1, 0.498, 1),
          steelblue: Float32Array.of(0.275, 0.51, 0.706, 1),
          tan: Float32Array.of(0.824, 0.706, 0.549, 1),
          teal: Float32Array.of(0, 0.502, 0.502, 1),
          thistle: Float32Array.of(0.847, 0.749, 0.847, 1),
          tomato: Float32Array.of(1, 0.388, 0.278, 1),
          transparent: Float32Array.of(0, 0, 0, 0),
          turquoise: Float32Array.of(0.251, 0.878, 0.816, 1),
          violet: Float32Array.of(0.933, 0.51, 0.933, 1),
          wheat: Float32Array.of(0.961, 0.871, 0.702, 1),
          white: Float32Array.of(1, 1, 1, 1),
          whitesmoke: Float32Array.of(0.961, 0.961, 0.961, 1),
          yellow: Float32Array.of(1, 1, 0, 1),
          yellowgreen: Float32Array.of(0.604, 0.804, 0.196, 1),
        };
        a._testing.parseColor = E;
        a._testing.colorToString = w;
        var sa =
            /(italic|oblique|normal|)\s*(small-caps|normal|)\s*(bold|bolder|lighter|[1-9]00|normal|)\s*([\d\.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q)(.+)/,
          ta = { "Noto Mono": { "*": null }, monospace: { "*": null } };
        a._testing.parseFontString = K;
        a.MakeCanvas = function (J, l) {
          return (J = a.MakeSurface(J, l)) ? new ba(J) : null;
        };
        a.ImageData = function () {
          if (2 === arguments.length) {
            var J = arguments[0],
              l = arguments[1];
            return new f(new Uint8ClampedArray(4 * J * l), J, l);
          }
          if (3 === arguments.length) {
            var r = arguments[0];
            if (r.prototype.constructor !== Uint8ClampedArray)
              throw "bytes must be given as a Uint8ClampedArray";
            J = arguments[1];
            l = arguments[2];
            if (r % 4) throw "bytes must be given in a multiple of 4";
            if (r % J) throw "bytes must divide evenly by width";
            if (l && l !== r / (4 * J)) throw "invalid height given";
            return new f(r, J, r / (4 * J));
          }
          throw (
            "invalid number of arguments - takes 2 or 3, saw " +
            arguments.length
          );
        };
      })();
    })(g);
    var ha = {},
      ja;
    for (ja in g) g.hasOwnProperty(ja) && (ha[ja] = g[ja]);
    var la = "./this.program";
    function ma(a, b) {
      throw b;
    }
    var na = !1,
      oa = !1,
      pa = !1,
      xa = !1;
    na = "object" === typeof window;
    oa = "function" === typeof importScripts;
    pa =
      "object" === typeof process &&
      "object" === typeof process.versions &&
      "string" === typeof process.versions.node;
    xa = !na && !pa && !oa;
    var ya = "",
      za,
      Aa,
      Ba,
      Ca;
    if (pa)
      (ya = oa ? require("path").dirname(ya) + "/" : __dirname + "/"),
        (za = function (a, b) {
          Ba || (Ba = require("fs"));
          Ca || (Ca = require("path"));
          a = Ca.normalize(a);
          return Ba.readFileSync(a, b ? null : "utf8");
        }),
        (Aa = function (a) {
          a = za(a, !0);
          a.buffer || (a = new Uint8Array(a));
          assert(a.buffer);
          return a;
        }),
        1 < process.argv.length && (la = process.argv[1].replace(/\\/g, "/")),
        process.argv.slice(2),
        process.on("uncaughtException", function (a) {
          if (!(a instanceof Da)) throw a;
        }),
        process.on("unhandledRejection", Ea),
        (ma = function (a) {
          process.exit(a);
        }),
        (g.inspect = function () {
          return "[Emscripten Module object]";
        });
    else if (xa)
      "undefined" != typeof read &&
        (za = function (a) {
          return read(a);
        }),
        (Aa = function (a) {
          if ("function" === typeof readbuffer)
            return new Uint8Array(readbuffer(a));
          a = read(a, "binary");
          assert("object" === typeof a);
          return a;
        }),
        "function" === typeof quit &&
          (ma = function (a) {
            quit(a);
          }),
        "undefined" !== typeof print &&
          ("undefined" === typeof console && (console = {}),
          (console.log = print),
          (console.warn = console.error =
            "undefined" !== typeof printErr ? printErr : print));
    else if (na || oa)
      oa
        ? (ya = self.location.href)
        : document.currentScript && (ya = document.currentScript.src),
        _scriptDir && (ya = _scriptDir),
        0 !== ya.indexOf("blob:")
          ? (ya = ya.substr(0, ya.lastIndexOf("/") + 1))
          : (ya = ""),
        (za = function (a) {
          var b = new XMLHttpRequest();
          b.open("GET", a, !1);
          b.send(null);
          return b.responseText;
        }),
        oa &&
          (Aa = function (a) {
            var b = new XMLHttpRequest();
            b.open("GET", a, !1);
            b.responseType = "arraybuffer";
            b.send(null);
            return new Uint8Array(b.response);
          });
    var Fa = g.print || console.log.bind(console),
      Ga = g.printErr || console.warn.bind(console);
    for (ja in ha) ha.hasOwnProperty(ja) && (g[ja] = ha[ja]);
    ha = null;
    g.thisProgram && (la = g.thisProgram);
    g.quit && (ma = g.quit);
    function Ha(a) {
      Ia || (Ia = {});
      Ia[a] || ((Ia[a] = 1), Ga(a));
    }
    var Ia,
      Ja = 0,
      Ka;
    g.wasmBinary && (Ka = g.wasmBinary);
    var noExitRuntime;
    g.noExitRuntime && (noExitRuntime = g.noExitRuntime);
    "object" !== typeof WebAssembly && Ga("no native wasm support detected");
    var La,
      Ma = new WebAssembly.Table({
        initial: 7685,
        maximum: 7685,
        element: "anyfunc",
      }),
      Na = !1;
    function assert(a, b) {
      a || Ea("Assertion failed: " + b);
    }
    var Oa =
      "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;
    function Pa(a, b, c) {
      var d = b + c;
      for (c = b; a[c] && !(c >= d); ) ++c;
      if (16 < c - b && a.subarray && Oa) return Oa.decode(a.subarray(b, c));
      for (d = ""; b < c; ) {
        var e = a[b++];
        if (e & 128) {
          var h = a[b++] & 63;
          if (192 == (e & 224)) d += String.fromCharCode(((e & 31) << 6) | h);
          else {
            var n = a[b++] & 63;
            e =
              224 == (e & 240)
                ? ((e & 15) << 12) | (h << 6) | n
                : ((e & 7) << 18) | (h << 12) | (n << 6) | (a[b++] & 63);
            65536 > e
              ? (d += String.fromCharCode(e))
              : ((e -= 65536),
                (d += String.fromCharCode(
                  55296 | (e >> 10),
                  56320 | (e & 1023)
                )));
          }
        } else d += String.fromCharCode(e);
      }
      return d;
    }
    function Qa(a, b) {
      return a ? Pa(k, a, b) : "";
    }
    function Ra(a, b, c, d) {
      if (!(0 < d)) return 0;
      var e = c;
      d = c + d - 1;
      for (var h = 0; h < a.length; ++h) {
        var n = a.charCodeAt(h);
        if (55296 <= n && 57343 >= n) {
          var q = a.charCodeAt(++h);
          n = (65536 + ((n & 1023) << 10)) | (q & 1023);
        }
        if (127 >= n) {
          if (c >= d) break;
          b[c++] = n;
        } else {
          if (2047 >= n) {
            if (c + 1 >= d) break;
            b[c++] = 192 | (n >> 6);
          } else {
            if (65535 >= n) {
              if (c + 2 >= d) break;
              b[c++] = 224 | (n >> 12);
            } else {
              if (c + 3 >= d) break;
              b[c++] = 240 | (n >> 18);
              b[c++] = 128 | ((n >> 12) & 63);
            }
            b[c++] = 128 | ((n >> 6) & 63);
          }
          b[c++] = 128 | (n & 63);
        }
      }
      b[c] = 0;
      return c - e;
    }
    function fa(a, b, c) {
      return Ra(a, k, b, c);
    }
    function ea(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d &&
          57343 >= d &&
          (d = (65536 + ((d & 1023) << 10)) | (a.charCodeAt(++c) & 1023));
        127 >= d ? ++b : (b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : b + 4);
      }
      return b;
    }
    var Sa =
      "undefined" !== typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;
    function Ta(a, b) {
      var c = a >> 1;
      for (var d = c + b / 2; !(c >= d) && Ua[c]; ) ++c;
      c <<= 1;
      if (32 < c - a && Sa) return Sa.decode(k.subarray(a, c));
      c = 0;
      for (d = ""; ; ) {
        var e = Va[(a + 2 * c) >> 1];
        if (0 == e || c == b / 2) return d;
        ++c;
        d += String.fromCharCode(e);
      }
    }
    function Xa(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;
      for (var e = 0; e < c; ++e) (Va[b >> 1] = a.charCodeAt(e)), (b += 2);
      Va[b >> 1] = 0;
      return b - d;
    }
    function Ya(a) {
      return 2 * a.length;
    }
    function Za(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4); ) {
        var e = v[(a + 4 * c) >> 2];
        if (0 == e) break;
        ++c;
        65536 <= e
          ? ((e -= 65536),
            (d += String.fromCharCode(55296 | (e >> 10), 56320 | (e & 1023))))
          : (d += String.fromCharCode(e));
      }
      return d;
    }
    function $a(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;
      for (var e = 0; e < a.length; ++e) {
        var h = a.charCodeAt(e);
        if (55296 <= h && 57343 >= h) {
          var n = a.charCodeAt(++e);
          h = (65536 + ((h & 1023) << 10)) | (n & 1023);
        }
        v[b >> 2] = h;
        b += 4;
        if (b + 4 > c) break;
      }
      v[b >> 2] = 0;
      return b - d;
    }
    function ab(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }
      return b;
    }
    function bb(a) {
      var b = ea(a) + 1,
        c = cb(b);
      c && Ra(a, db, c, b);
      return c;
    }
    var eb, db, k, Va, Ua, v, fb, G, kb;
    function lb(a) {
      eb = a;
      g.HEAP8 = db = new Int8Array(a);
      g.HEAP16 = Va = new Int16Array(a);
      g.HEAP32 = v = new Int32Array(a);
      g.HEAPU8 = k = new Uint8Array(a);
      g.HEAPU16 = Ua = new Uint16Array(a);
      g.HEAPU32 = fb = new Uint32Array(a);
      g.HEAPF32 = G = new Float32Array(a);
      g.HEAPF64 = kb = new Float64Array(a);
    }
    var mb = g.INITIAL_MEMORY || 134217728;
    g.wasmMemory
      ? (La = g.wasmMemory)
      : (La = new WebAssembly.Memory({ initial: mb / 65536, maximum: 32768 }));
    La && (eb = La.buffer);
    mb = eb.byteLength;
    lb(eb);
    v[448548] = 7037232;
    function nb(a) {
      for (; 0 < a.length; ) {
        var b = a.shift();
        if ("function" == typeof b) b(g);
        else {
          var c = b.Xl;
          "number" === typeof c
            ? void 0 === b.xl
              ? g.dynCall_v(c)
              : g.dynCall_vi(c, b.xl)
            : c(void 0 === b.xl ? null : b.xl);
        }
      }
    }
    var ob = [],
      pb = [],
      qb = [],
      rb = [];
    function sb() {
      var a = g.preRun.shift();
      ob.unshift(a);
    }
    var tb = Math.ceil,
      ub = Math.floor,
      vb = 0,
      wb = null,
      xb = null;
    g.preloadedImages = {};
    g.preloadedAudios = {};
    function Ea(a) {
      if (g.onAbort) g.onAbort(a);
      Fa(a);
      Ga(a);
      Na = !0;
      throw new WebAssembly.RuntimeError(
        "abort(" + a + "). Build with -s ASSERTIONS=1 for more info."
      );
    }
    function yb(a) {
      var b = zb;
      return String.prototype.startsWith ? b.startsWith(a) : 0 === b.indexOf(a);
    }
    function Ab() {
      return yb("data:application/octet-stream;base64,");
    }
    var zb = "canvaskit.wasm";
    if (!Ab()) {
      var Bb = zb;
      zb = g.locateFile ? g.locateFile(Bb, ya) : ya + Bb;
    }
    function Cb() {
      try {
        if (Ka) return new Uint8Array(Ka);
        if (Aa) return Aa(zb);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        Ea(a);
      }
    }
    function Db() {
      return Ka || (!na && !oa) || "function" !== typeof fetch || yb("file://")
        ? new Promise(function (a) {
            a(Cb());
          })
        : fetch(zb, { credentials: "same-origin" })
            .then(function (a) {
              if (!a.ok)
                throw "failed to load wasm binary file at '" + zb + "'";
              return a.arrayBuffer();
            })
            .catch(function () {
              return Cb();
            });
    }
    pb.push({
      Xl: function () {
        Eb();
      },
    });
    function Fb() {
      return 0 < Fb.Yl;
    }
    var Gb = {},
      Hb = [null, [], []],
      Ib = {},
      Jb = {};
    function Kb(a) {
      for (; a.length; ) {
        var b = a.pop();
        a.pop()(b);
      }
    }
    function Lb(a) {
      return this.fromWireType(fb[a >> 2]);
    }
    var Mb = {},
      Nb = {},
      Ob = {};
    function Pb(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }
    function Qb(a, b) {
      a = Pb(a);
      return new Function(
        "body",
        "return function " +
          a +
          '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'
      )(b);
    }
    function Rb(a) {
      var b = Error,
        c = Qb(a, function (d) {
          this.name = a;
          this.message = d;
          d = Error(d).stack;
          void 0 !== d &&
            (this.stack =
              this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""));
        });
      c.prototype = Object.create(b.prototype);
      c.prototype.constructor = c;
      c.prototype.toString = function () {
        return void 0 === this.message
          ? this.name
          : this.name + ": " + this.message;
      };
      return c;
    }
    var Sb = void 0;
    function Tb(a) {
      throw new Sb(a);
    }
    function Ub(a, b, c) {
      function d(q) {
        q = c(q);
        q.length !== a.length && Tb("Mismatched type converter count");
        for (var u = 0; u < a.length; ++u) Vb(a[u], q[u]);
      }
      a.forEach(function (q) {
        Ob[q] = b;
      });
      var e = Array(b.length),
        h = [],
        n = 0;
      b.forEach(function (q, u) {
        Nb.hasOwnProperty(q)
          ? (e[u] = Nb[q])
          : (h.push(q),
            Mb.hasOwnProperty(q) || (Mb[q] = []),
            Mb[q].push(function () {
              e[u] = Nb[q];
              ++n;
              n === h.length && d(e);
            }));
      });
      0 === h.length && d(e);
    }
    var Wb = {};
    function Xb(a) {
      switch (a) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw new TypeError("Unknown type size: " + a);
      }
    }
    var Yb = void 0;
    function Zb(a) {
      for (var b = ""; k[a]; ) b += Yb[k[a++]];
      return b;
    }
    var $b = void 0;
    function ac(a) {
      throw new $b(a);
    }
    function Vb(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b))
        throw new TypeError(
          "registerType registeredInstance requires argPackAdvance"
        );
      var d = b.name;
      a || ac('type "' + d + '" must have a positive integer typeid pointer');
      if (Nb.hasOwnProperty(a)) {
        if (c.um) return;
        ac("Cannot register type '" + d + "' twice");
      }
      Nb[a] = b;
      delete Ob[a];
      Mb.hasOwnProperty(a) &&
        ((b = Mb[a]),
        delete Mb[a],
        b.forEach(function (e) {
          e();
        }));
    }
    function bc(a) {
      return {
        count: a.count,
        gl: a.gl,
        ql: a.ql,
        pk: a.pk,
        tk: a.tk,
        Ck: a.Ck,
        Gk: a.Gk,
      };
    }
    function cc(a) {
      ac(a.ik.tk.mk.name + " instance already deleted");
    }
    var dc = !1;
    function ec() {}
    function fc(a) {
      --a.count.value;
      0 === a.count.value && (a.Ck ? a.Gk.Fk(a.Ck) : a.tk.mk.Fk(a.pk));
    }
    function hc(a) {
      if ("undefined" === typeof FinalizationGroup)
        return (
          (hc = function (b) {
            return b;
          }),
          a
        );
      dc = new FinalizationGroup(function (b) {
        for (var c = b.next(); !c.done; c = b.next())
          (c = c.value),
            c.pk ? fc(c) : console.warn("object already deleted: " + c.pk);
      });
      hc = function (b) {
        dc.register(b, b.ik, b.ik);
        return b;
      };
      ec = function (b) {
        dc.unregister(b.ik);
      };
      return hc(a);
    }
    var ic = void 0,
      jc = [];
    function kc() {
      for (; jc.length; ) {
        var a = jc.pop();
        a.ik.gl = !1;
        a["delete"]();
      }
    }
    function lc() {}
    var mc = {};
    function nc(a, b, c) {
      if (void 0 === a[b].wk) {
        var d = a[b];
        a[b] = function () {
          a[b].wk.hasOwnProperty(arguments.length) ||
            ac(
              "Function '" +
                c +
                "' called with an invalid number of arguments (" +
                arguments.length +
                ") - expects one of (" +
                a[b].wk +
                ")!"
            );
          return a[b].wk[arguments.length].apply(this, arguments);
        };
        a[b].wk = [];
        a[b].wk[d.fl] = d;
      }
    }
    function oc(a, b, c) {
      g.hasOwnProperty(a)
        ? ((void 0 === c || (void 0 !== g[a].wk && void 0 !== g[a].wk[c])) &&
            ac("Cannot register public name '" + a + "' twice"),
          nc(g, a, a),
          g.hasOwnProperty(c) &&
            ac(
              "Cannot register multiple overloads of a function with the same number of arguments (" +
                c +
                ")!"
            ),
          (g[a].wk[c] = b))
        : ((g[a] = b), void 0 !== c && (g[a].gn = c));
    }
    function pc(a, b, c, d, e, h, n, q) {
      this.name = a;
      this.constructor = b;
      this.hl = c;
      this.Fk = d;
      this.Ik = e;
      this.qm = h;
      this.tl = n;
      this.km = q;
      this.Hm = [];
    }
    function qc(a, b, c) {
      for (; b !== c; )
        b.tl ||
          ac(
            "Expected null or instance of " +
              c.name +
              ", got an instance of " +
              b.name
          ),
          (a = b.tl(a)),
          (b = b.Ik);
      return a;
    }
    function rc(a, b) {
      if (null === b)
        return this.Nl && ac("null is not a valid " + this.name), 0;
      b.ik || ac('Cannot pass "' + sc(b) + '" as a ' + this.name);
      b.ik.pk ||
        ac("Cannot pass deleted object as a pointer of type " + this.name);
      return qc(b.ik.pk, b.ik.tk.mk, this.mk);
    }
    function tc(a, b) {
      if (null === b) {
        this.Nl && ac("null is not a valid " + this.name);
        if (this.zl) {
          var c = this.rl();
          null !== a && a.push(this.Fk, c);
          return c;
        }
        return 0;
      }
      b.ik || ac('Cannot pass "' + sc(b) + '" as a ' + this.name);
      b.ik.pk ||
        ac("Cannot pass deleted object as a pointer of type " + this.name);
      !this.yl &&
        b.ik.tk.yl &&
        ac(
          "Cannot convert argument of type " +
            (b.ik.Gk ? b.ik.Gk.name : b.ik.tk.name) +
            " to parameter type " +
            this.name
        );
      c = qc(b.ik.pk, b.ik.tk.mk, this.mk);
      if (this.zl)
        switch (
          (void 0 === b.ik.Ck &&
            ac("Passing raw pointer to smart pointer is illegal"),
          this.Lm)
        ) {
          case 0:
            b.ik.Gk === this
              ? (c = b.ik.Ck)
              : ac(
                  "Cannot convert argument of type " +
                    (b.ik.Gk ? b.ik.Gk.name : b.ik.tk.name) +
                    " to parameter type " +
                    this.name
                );
            break;
          case 1:
            c = b.ik.Ck;
            break;
          case 2:
            if (b.ik.Gk === this) c = b.ik.Ck;
            else {
              var d = b.clone();
              c = this.Jm(
                c,
                uc(function () {
                  d["delete"]();
                })
              );
              null !== a && a.push(this.Fk, c);
            }
            break;
          default:
            ac("Unsupporting sharing policy");
        }
      return c;
    }
    function vc(a, b) {
      if (null === b)
        return this.Nl && ac("null is not a valid " + this.name), 0;
      b.ik || ac('Cannot pass "' + sc(b) + '" as a ' + this.name);
      b.ik.pk ||
        ac("Cannot pass deleted object as a pointer of type " + this.name);
      b.ik.tk.yl &&
        ac(
          "Cannot convert argument of type " +
            b.ik.tk.name +
            " to parameter type " +
            this.name
        );
      return qc(b.ik.pk, b.ik.tk.mk, this.mk);
    }
    function wc(a, b, c) {
      if (b === c) return a;
      if (void 0 === c.Ik) return null;
      a = wc(a, b, c.Ik);
      return null === a ? null : c.km(a);
    }
    var xc = {};
    function yc(a, b) {
      for (void 0 === b && ac("ptr should not be undefined"); a.Ik; )
        (b = a.tl(b)), (a = a.Ik);
      return xc[b];
    }
    function zc(a, b) {
      (b.tk && b.pk) || Tb("makeClassHandle requires ptr and ptrType");
      !!b.Gk !== !!b.Ck &&
        Tb("Both smartPtrType and smartPtr must be specified");
      b.count = { value: 1 };
      return hc(Object.create(a, { ik: { value: b } }));
    }
    function Ac(a, b, c, d, e, h, n, q, u, A, C) {
      this.name = a;
      this.mk = b;
      this.Nl = c;
      this.yl = d;
      this.zl = e;
      this.Gm = h;
      this.Lm = n;
      this.am = q;
      this.rl = u;
      this.Jm = A;
      this.Fk = C;
      e || void 0 !== b.Ik
        ? (this.toWireType = tc)
        : ((this.toWireType = d ? rc : vc), (this.Bk = null));
    }
    function Bc(a, b, c) {
      g.hasOwnProperty(a) || Tb("Replacing nonexistant public symbol");
      void 0 !== g[a].wk && void 0 !== c
        ? (g[a].wk[c] = b)
        : ((g[a] = b), (g[a].fl = c));
    }
    function Cc(a, b) {
      a = Zb(a);
      var c = g["dynCall_" + a];
      for (var d = [], e = 1; e < a.length; ++e) d.push("a" + e);
      e =
        "return function dynCall_" +
        (a + "_" + b) +
        "(" +
        d.join(", ") +
        ") {\n";
      e +=
        "    return dynCall(rawFunction" +
        (d.length ? ", " : "") +
        d.join(", ") +
        ");\n";
      c = new Function("dynCall", "rawFunction", e + "};\n")(c, b);
      "function" !== typeof c &&
        ac("unknown function pointer with signature " + a + ": " + b);
      return c;
    }
    var Fc = void 0;
    function Gc(a) {
      a = Hc(a);
      var b = Zb(a);
      Ic(a);
      return b;
    }
    function Jc(a, b) {
      function c(h) {
        e[h] || Nb[h] || (Ob[h] ? Ob[h].forEach(c) : (d.push(h), (e[h] = !0)));
      }
      var d = [],
        e = {};
      b.forEach(c);
      throw new Fc(a + ": " + d.map(Gc).join([", "]));
    }
    function Kc(a) {
      var b = Function;
      if (!(b instanceof Function))
        throw new TypeError(
          "new_ called with constructor type " +
            typeof b +
            " which is not a function"
        );
      var c = Qb(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }
    function Lc(a, b, c, d, e) {
      var h = b.length;
      2 > h &&
        ac(
          "argTypes array size mismatch! Must at least get return value and 'this' types!"
        );
      var n = null !== b[1] && null !== c,
        q = !1;
      for (c = 1; c < b.length; ++c)
        if (null !== b[c] && void 0 === b[c].Bk) {
          q = !0;
          break;
        }
      var u = "void" !== b[0].name,
        A = "",
        C = "";
      for (c = 0; c < h - 2; ++c)
        (A += (0 !== c ? ", " : "") + "arg" + c),
          (C += (0 !== c ? ", " : "") + "arg" + c + "Wired");
      a =
        "return function " +
        Pb(a) +
        "(" +
        A +
        ") {\nif (arguments.length !== " +
        (h - 2) +
        ") {\nthrowBindingError('function " +
        a +
        " called with ' + arguments.length + ' arguments, expected " +
        (h - 2) +
        " args!');\n}\n";
      q && (a += "var destructors = [];\n");
      var M = q ? "destructors" : "null";
      A =
        "throwBindingError invoker fn runDestructors retType classParam".split(
          " "
        );
      d = [ac, d, e, Kb, b[0], b[1]];
      n && (a += "var thisWired = classParam.toWireType(" + M + ", this);\n");
      for (c = 0; c < h - 2; ++c)
        (a +=
          "var arg" +
          c +
          "Wired = argType" +
          c +
          ".toWireType(" +
          M +
          ", arg" +
          c +
          "); // " +
          b[c + 2].name +
          "\n"),
          A.push("argType" + c),
          d.push(b[c + 2]);
      n && (C = "thisWired" + (0 < C.length ? ", " : "") + C);
      a +=
        (u ? "var rv = " : "") +
        "invoker(fn" +
        (0 < C.length ? ", " : "") +
        C +
        ");\n";
      if (q) a += "runDestructors(destructors);\n";
      else
        for (c = n ? 1 : 2; c < b.length; ++c)
          (h = 1 === c ? "thisWired" : "arg" + (c - 2) + "Wired"),
            null !== b[c].Bk &&
              ((a += h + "_dtor(" + h + "); // " + b[c].name + "\n"),
              A.push(h + "_dtor"),
              d.push(b[c].Bk));
      u && (a += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
      A.push(a + "}\n");
      return Kc(A).apply(null, d);
    }
    function Mc(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(v[(b >> 2) + d]);
      return c;
    }
    var Nc = [],
      Oc = [
        {},
        { value: void 0 },
        { value: null },
        { value: !0 },
        { value: !1 },
      ];
    function Pc(a) {
      4 < a && 0 === --Oc[a].Ol && ((Oc[a] = void 0), Nc.push(a));
    }
    function uc(a) {
      switch (a) {
        case void 0:
          return 1;
        case null:
          return 2;
        case !0:
          return 3;
        case !1:
          return 4;
        default:
          var b = Nc.length ? Nc.pop() : Oc.length;
          Oc[b] = { Ol: 1, value: a };
          return b;
      }
    }
    function Qc(a, b, c) {
      switch (b) {
        case 0:
          return function (d) {
            return this.fromWireType((c ? db : k)[d]);
          };
        case 1:
          return function (d) {
            return this.fromWireType((c ? Va : Ua)[d >> 1]);
          };
        case 2:
          return function (d) {
            return this.fromWireType((c ? v : fb)[d >> 2]);
          };
        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }
    function Rc(a, b) {
      var c = Nb[a];
      void 0 === c && ac(b + " has unknown type " + Gc(a));
      return c;
    }
    function sc(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b
        ? a.toString()
        : "" + a;
    }
    function Sc(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(G[c >> 2]);
          };
        case 3:
          return function (c) {
            return this.fromWireType(kb[c >> 3]);
          };
        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }
    function Tc(a, b, c) {
      switch (b) {
        case 0:
          return c
            ? function (d) {
                return db[d];
              }
            : function (d) {
                return k[d];
              };
        case 1:
          return c
            ? function (d) {
                return Va[d >> 1];
              }
            : function (d) {
                return Ua[d >> 1];
              };
        case 2:
          return c
            ? function (d) {
                return v[d >> 2];
              }
            : function (d) {
                return fb[d >> 2];
              };
        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }
    var Uc = {};
    function Vc(a) {
      var b = Uc[a];
      return void 0 === b ? Zb(a) : b;
    }
    var Wc = [];
    function Xc(a) {
      var b = Wc.length;
      Wc.push(a);
      return b;
    }
    function Yc(a, b) {
      for (var c = Array(a), d = 0; d < a; ++d)
        c[d] = Rc(v[(b >> 2) + d], "parameter " + d);
      return c;
    }
    var Zc;
    pa
      ? (Zc = function () {
          var a = process.hrtime();
          return 1e3 * a[0] + a[1] / 1e6;
        })
      : "undefined" !== typeof dateNow
      ? (Zc = dateNow)
      : (Zc = function () {
          return performance.now();
        });
    function $c(a, b) {
      ad = a;
      bd = b;
      if (cd)
        if (0 == a)
          dd = function () {
            var d = Math.max(0, ed + b - Zc()) | 0;
            setTimeout(fd, d);
          };
        else if (1 == a)
          dd = function () {
            gd(fd);
          };
        else if (2 == a) {
          if ("undefined" === typeof setImmediate) {
            var c = [];
            addEventListener(
              "message",
              function (d) {
                if (
                  "setimmediate" === d.data ||
                  "setimmediate" === d.data.target
                )
                  d.stopPropagation(), c.shift()();
              },
              !0
            );
            setImmediate = function (d) {
              c.push(d);
              oa
                ? (void 0 === g.setImmediates && (g.setImmediates = []),
                  g.setImmediates.push(d),
                  postMessage({ target: "setimmediate" }))
                : postMessage("setimmediate", "*");
            };
          }
          dd = function () {
            setImmediate(fd);
          };
        }
    }
    function hd(a) {
      var b = id;
      noExitRuntime = !0;
      assert(
        !cd,
        "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters."
      );
      cd = a;
      id = b;
      var c =
        "undefined" !== typeof b
          ? function () {
              g.dynCall_vi(a, b);
            }
          : function () {
              g.dynCall_v(a);
            };
      var d = jd;
      fd = function () {
        if (!Na)
          if (0 < md.length) {
            var e = Date.now(),
              h = md.shift();
            h.Xl(h.xl);
            if (nd) {
              var n = nd,
                q = 0 == n % 1 ? n - 1 : Math.floor(n);
              nd = h.an ? q : (8 * n + (q + 0.5)) / 9;
            }
            console.log(
              'main loop blocker "' +
                h.name +
                '" took ' +
                (Date.now() - e) +
                " ms"
            );
            g.setStatus &&
              ((e = g.statusMessage || "Please wait..."),
              (h = nd),
              (n = od.dn),
              h
                ? h < n
                  ? g.setStatus(e + " (" + (n - h) + "/" + n + ")")
                  : g.setStatus(e)
                : g.setStatus(""));
            d < jd || setTimeout(fd, 0);
          } else if (!(d < jd))
            if (((pd = (pd + 1) | 0), 1 == ad && 1 < bd && 0 != pd % bd)) dd();
            else {
              0 == ad && (ed = Zc());
              a: if (!(Na || (g.preMainLoop && !1 === g.preMainLoop()))) {
                try {
                  c();
                } catch (u) {
                  if (u instanceof Da) break a;
                  u &&
                    "object" === typeof u &&
                    u.stack &&
                    Ga("exception thrown: " + [u, u.stack]);
                  throw u;
                }
                g.postMainLoop && g.postMainLoop();
              }
              d < jd ||
                ("object" === typeof SDL &&
                  SDL.audio &&
                  SDL.audio.Im &&
                  SDL.audio.Im(),
                dd());
            }
      };
    }
    var dd = null,
      jd = 0,
      cd = null,
      id = 0,
      ad = 0,
      bd = 0,
      pd = 0,
      md = [],
      od = {},
      ed,
      fd,
      nd,
      qd = !1,
      rd = !1,
      sd = [];
    function td() {
      function a() {
        rd =
          document.pointerLockElement === g.canvas ||
          document.mozPointerLockElement === g.canvas ||
          document.webkitPointerLockElement === g.canvas ||
          document.msPointerLockElement === g.canvas;
      }
      g.preloadPlugins || (g.preloadPlugins = []);
      if (!ud) {
        ud = !0;
        try {
          vd = !0;
        } catch (c) {
          (vd = !1),
            console.log(
              "warning: no blob constructor, cannot create blobs with mimetypes"
            );
        }
        wd =
          "undefined" != typeof MozBlobBuilder
            ? MozBlobBuilder
            : "undefined" != typeof WebKitBlobBuilder
            ? WebKitBlobBuilder
            : vd
            ? null
            : console.log("warning: no BlobBuilder");
        xd =
          "undefined" != typeof window
            ? window.URL
              ? window.URL
              : window.webkitURL
            : void 0;
        g.$l ||
          "undefined" !== typeof xd ||
          (console.log(
            "warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."
          ),
          (g.$l = !0));
        g.preloadPlugins.push({
          canHandle: function (c) {
            return !g.$l && /\.(jpg|jpeg|png|bmp)$/i.test(c);
          },
          handle: function (c, d, e, h) {
            var n = null;
            if (vd)
              try {
                (n = new Blob([c], { type: yd(d) })),
                  n.size !== c.length &&
                    (n = new Blob([new Uint8Array(c).buffer], { type: yd(d) }));
              } catch (A) {
                Ha(
                  "Blob constructor present but fails: " +
                    A +
                    "; falling back to blob builder"
                );
              }
            n ||
              ((n = new wd()),
              n.append(new Uint8Array(c).buffer),
              (n = n.getBlob()));
            var q = xd.createObjectURL(n),
              u = new Image();
            u.onload = function () {
              assert(u.complete, "Image " + d + " could not be decoded");
              var A = document.createElement("canvas");
              A.width = u.width;
              A.height = u.height;
              A.getContext("2d").drawImage(u, 0, 0);
              g.preloadedImages[d] = A;
              xd.revokeObjectURL(q);
              e && e(c);
            };
            u.onerror = function () {
              console.log("Image " + q + " could not be decoded");
              h && h();
            };
            u.src = q;
          },
        });
        g.preloadPlugins.push({
          canHandle: function (c) {
            return !g.fn && c.substr(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 };
          },
          handle: function (c, d, e, h) {
            function n(M) {
              u || ((u = !0), (g.preloadedAudios[d] = M), e && e(c));
            }
            function q() {
              u || ((u = !0), (g.preloadedAudios[d] = new Audio()), h && h());
            }
            var u = !1;
            if (vd) {
              try {
                var A = new Blob([c], { type: yd(d) });
              } catch (M) {
                return q();
              }
              A = xd.createObjectURL(A);
              var C = new Audio();
              C.addEventListener(
                "canplaythrough",
                function () {
                  n(C);
                },
                !1
              );
              C.onerror = function () {
                if (!u) {
                  console.log(
                    "warning: browser could not fully decode audio " +
                      d +
                      ", trying slower base64 approach"
                  );
                  for (var M = "", Q = 0, x = 0, P = 0; P < c.length; P++)
                    for (Q = (Q << 8) | c[P], x += 8; 6 <= x; ) {
                      var Z = (Q >> (x - 6)) & 63;
                      x -= 6;
                      M +=
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                          Z
                        ];
                    }
                  2 == x
                    ? ((M +=
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                          (Q & 3) << 4
                        ]),
                      (M += "=="))
                    : 4 == x &&
                      ((M +=
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                          (Q & 15) << 2
                        ]),
                      (M += "="));
                  C.src = "data:audio/x-" + d.substr(-3) + ";base64," + M;
                  n(C);
                }
              };
              C.src = A;
              zd(function () {
                n(C);
              });
            } else return q();
          },
        });
        var b = g.canvas;
        b &&
          ((b.requestPointerLock =
            b.requestPointerLock ||
            b.mozRequestPointerLock ||
            b.webkitRequestPointerLock ||
            b.msRequestPointerLock ||
            function () {}),
          (b.exitPointerLock =
            document.exitPointerLock ||
            document.mozExitPointerLock ||
            document.webkitExitPointerLock ||
            document.msExitPointerLock ||
            function () {}),
          (b.exitPointerLock = b.exitPointerLock.bind(document)),
          document.addEventListener("pointerlockchange", a, !1),
          document.addEventListener("mozpointerlockchange", a, !1),
          document.addEventListener("webkitpointerlockchange", a, !1),
          document.addEventListener("mspointerlockchange", a, !1),
          g.elementPointerLock &&
            b.addEventListener(
              "click",
              function (c) {
                !rd &&
                  g.canvas.requestPointerLock &&
                  (g.canvas.requestPointerLock(), c.preventDefault());
              },
              !1
            ));
      }
    }
    function Ad(a, b, c, d) {
      if (b && g.Jl && a == g.canvas) return g.Jl;
      var e;
      if (b) {
        var h = {
          antialias: !1,
          alpha: !1,
          Zl: "undefined" !== typeof WebGL2RenderingContext ? 2 : 1,
        };
        if (d) for (var n in d) h[n] = d[n];
        if ("undefined" !== typeof Bd && (e = Cd(a, h))) var q = Dd[e].El;
      } else q = a.getContext("2d");
      if (!q) return null;
      c &&
        (b ||
          assert(
            "undefined" === typeof L,
            "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"
          ),
        (g.Jl = q),
        b && Ed(e),
        (g.kn = b),
        sd.forEach(function (u) {
          u();
        }),
        td());
      return q;
    }
    var Fd = !1,
      Gd = void 0,
      Hd = void 0;
    function Id(a, b) {
      function c() {
        qd = !1;
        var h = d.parentNode;
        (document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement ||
          document.webkitFullscreenElement ||
          document.webkitCurrentFullScreenElement) === h
          ? ((d.exitFullscreen = Jd),
            Gd && d.requestPointerLock(),
            (qd = !0),
            Hd
              ? ("undefined" != typeof SDL &&
                  (v[SDL.screen >> 2] = fb[SDL.screen >> 2] | 8388608),
                Kd(g.canvas),
                Ld())
              : Kd(d))
          : (h.parentNode.insertBefore(d, h),
            h.parentNode.removeChild(h),
            Hd
              ? ("undefined" != typeof SDL &&
                  (v[SDL.screen >> 2] = fb[SDL.screen >> 2] & -8388609),
                Kd(g.canvas),
                Ld())
              : Kd(d));
        if (g.onFullScreen) g.onFullScreen(qd);
        if (g.onFullscreen) g.onFullscreen(qd);
      }
      Gd = a;
      Hd = b;
      "undefined" === typeof Gd && (Gd = !0);
      "undefined" === typeof Hd && (Hd = !1);
      var d = g.canvas;
      Fd ||
        ((Fd = !0),
        document.addEventListener("fullscreenchange", c, !1),
        document.addEventListener("mozfullscreenchange", c, !1),
        document.addEventListener("webkitfullscreenchange", c, !1),
        document.addEventListener("MSFullscreenChange", c, !1));
      var e = document.createElement("div");
      d.parentNode.insertBefore(e, d);
      e.appendChild(d);
      e.requestFullscreen =
        e.requestFullscreen ||
        e.mozRequestFullScreen ||
        e.msRequestFullscreen ||
        (e.webkitRequestFullscreen
          ? function () {
              e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
          : null) ||
        (e.webkitRequestFullScreen
          ? function () {
              e.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
          : null);
      e.requestFullscreen();
    }
    function Jd() {
      if (!qd) return !1;
      (
        document.exitFullscreen ||
        document.cancelFullScreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen ||
        document.webkitCancelFullScreen ||
        function () {}
      ).apply(document, []);
      return !0;
    }
    var Md = 0;
    function gd(a) {
      if ("function" === typeof requestAnimationFrame) requestAnimationFrame(a);
      else {
        var b = Date.now();
        if (0 === Md) Md = b + 1e3 / 60;
        else for (; b + 2 >= Md; ) Md += 1e3 / 60;
        setTimeout(a, Math.max(Md - b, 0));
      }
    }
    function zd(a) {
      noExitRuntime = !0;
      setTimeout(function () {
        Na || a();
      }, 1e4);
    }
    function yd(a) {
      return {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        bmp: "image/bmp",
        ogg: "audio/ogg",
        wav: "audio/wav",
        mp3: "audio/mpeg",
      }[a.substr(a.lastIndexOf(".") + 1)];
    }
    var Nd = [];
    function Ld() {
      var a = g.canvas;
      Nd.forEach(function (b) {
        b(a.width, a.height);
      });
    }
    function Kd(a, b, c) {
      b && c ? ((a.Vm = b), (a.tm = c)) : ((b = a.Vm), (c = a.tm));
      var d = b,
        e = c;
      g.forcedAspectRatio &&
        0 < g.forcedAspectRatio &&
        (d / e < g.forcedAspectRatio
          ? (d = Math.round(e * g.forcedAspectRatio))
          : (e = Math.round(d / g.forcedAspectRatio)));
      if (
        (document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement ||
          document.webkitFullscreenElement ||
          document.webkitCurrentFullScreenElement) === a.parentNode &&
        "undefined" != typeof screen
      ) {
        var h = Math.min(screen.width / d, screen.height / e);
        d = Math.round(d * h);
        e = Math.round(e * h);
      }
      Hd
        ? (a.width != d && (a.width = d),
          a.height != e && (a.height = e),
          "undefined" != typeof a.style &&
            (a.style.removeProperty("width"), a.style.removeProperty("height")))
        : (a.width != b && (a.width = b),
          a.height != c && (a.height = c),
          "undefined" != typeof a.style &&
            (d != b || e != c
              ? (a.style.setProperty("width", d + "px", "important"),
                a.style.setProperty("height", e + "px", "important"))
              : (a.style.removeProperty("width"),
                a.style.removeProperty("height"))));
    }
    var ud,
      vd,
      wd,
      xd,
      Od = {};
    function Pd(a) {
      var b = a.getExtension("ANGLE_instanced_arrays");
      b &&
        ((a.vertexAttribDivisor = function (c, d) {
          b.vertexAttribDivisorANGLE(c, d);
        }),
        (a.drawArraysInstanced = function (c, d, e, h) {
          b.drawArraysInstancedANGLE(c, d, e, h);
        }),
        (a.drawElementsInstanced = function (c, d, e, h, n) {
          b.drawElementsInstancedANGLE(c, d, e, h, n);
        }));
    }
    function Qd(a) {
      var b = a.getExtension("OES_vertex_array_object");
      b &&
        ((a.createVertexArray = function () {
          return b.createVertexArrayOES();
        }),
        (a.deleteVertexArray = function (c) {
          b.deleteVertexArrayOES(c);
        }),
        (a.bindVertexArray = function (c) {
          b.bindVertexArrayOES(c);
        }),
        (a.isVertexArray = function (c) {
          return b.isVertexArrayOES(c);
        }));
    }
    function Rd(a) {
      var b = a.getExtension("WEBGL_draw_buffers");
      b &&
        (a.drawBuffers = function (c, d) {
          b.drawBuffersWEBGL(c, d);
        });
    }
    var Sd = 1,
      Td = 0,
      Ud = [],
      N = [],
      Vd = [],
      Wd = [],
      Xd = [],
      R = [],
      Yd = [],
      Zd = [],
      Dd = [],
      U = null,
      $d = [],
      ae = [],
      be = [],
      ce = [],
      de = [],
      ee = {},
      fe = {},
      ge = {},
      he = 4;
    function Y(a) {
      Td || (Td = a);
    }
    function ie(a) {
      for (var b = Sd++, c = a.length; c < b; c++) a[c] = null;
      return b;
    }
    var je = [0],
      ke = [0];
    function le(a, b, c) {
      for (var d = "", e = 0; e < a; ++e) {
        var h = c ? v[(c + 4 * e) >> 2] : -1;
        d += Qa(v[(b + 4 * e) >> 2], 0 > h ? void 0 : h);
      }
      return d;
    }
    function Cd(a, b) {
      if (
        (a = 1 < b.Zl ? a.getContext("webgl2", b) : a.getContext("webgl", b))
      ) {
        var c = ie(Dd),
          d = { sm: c, attributes: b, version: b.Zl, El: a };
        a.canvas && (a.canvas.Wm = d);
        Dd[c] = d;
        ("undefined" === typeof b.lm || b.lm) && me(d);
        b = c;
      } else b = 0;
      return b;
    }
    function Ed(a) {
      U = Dd[a];
      g.Jl = L = U && U.El;
      return !(a && !L);
    }
    function me(a) {
      a || (a = U);
      if (!a.wm) {
        a.wm = !0;
        var b = a.El;
        Pd(b);
        Qd(b);
        Rd(b);
        b.bn = b.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
        b.Ek = b.getExtension("EXT_disjoint_timer_query");
        var c =
          "OES_texture_float OES_texture_half_float OES_standard_derivatives OES_vertex_array_object WEBGL_compressed_texture_s3tc WEBGL_depth_texture OES_element_index_uint EXT_texture_filter_anisotropic EXT_frag_depth WEBGL_draw_buffers ANGLE_instanced_arrays OES_texture_float_linear OES_texture_half_float_linear EXT_blend_minmax EXT_shader_texture_lod EXT_texture_norm16 WEBGL_compressed_texture_pvrtc EXT_color_buffer_half_float WEBGL_color_buffer_float EXT_sRGB WEBGL_compressed_texture_etc1 EXT_disjoint_timer_query WEBGL_compressed_texture_etc WEBGL_compressed_texture_astc EXT_color_buffer_float WEBGL_compressed_texture_s3tc_srgb EXT_disjoint_timer_query_webgl2 WEBKIT_WEBGL_compressed_texture_pvrtc".split(
            " "
          );
        (b.getSupportedExtensions() || []).forEach(function (d) {
          -1 != c.indexOf(d) && b.getExtension(d);
        });
      }
    }
    function ne(a) {
      var b = N[a];
      a = ee[a] = { Sl: {}, Al: 0, Jk: -1, Kk: -1 };
      for (
        var c = a.Sl, d = L.getProgramParameter(b, 35718), e = 0;
        e < d;
        ++e
      ) {
        var h = L.getActiveUniform(b, e),
          n = h.name;
        a.Al = Math.max(a.Al, n.length + 1);
        "]" == n.slice(-1) && (n = n.slice(0, n.lastIndexOf("[")));
        var q = L.getUniformLocation(b, n);
        if (q) {
          var u = ie(R);
          c[n] = [h.size, u];
          R[u] = q;
          for (var A = 1; A < h.size; ++A)
            (q = L.getUniformLocation(b, n + "[" + A + "]")),
              (u = ie(R)),
              (R[u] = q);
        }
      }
    }
    var Bd = {},
      oe,
      pe,
      qe = [];
    function re(a, b, c, d) {
      L.drawElements(a, b, c, d);
    }
    function se(a, b, c, d) {
      for (var e = 0; e < a; e++) {
        var h = L[c](),
          n = h && ie(d);
        h ? ((h.name = n), (d[n] = h)) : Y(1282);
        v[(b + 4 * e) >> 2] = n;
      }
    }
    function te(a, b) {
      fb[a >> 2] = b;
      fb[(a + 4) >> 2] = (b - fb[a >> 2]) / 4294967296;
    }
    function ue(a, b, c) {
      if (b) {
        var d = void 0;
        switch (a) {
          case 36346:
            d = 1;
            break;
          case 36344:
            0 != c && 1 != c && Y(1280);
            return;
          case 34814:
          case 36345:
            d = 0;
            break;
          case 34466:
            var e = L.getParameter(34467);
            d = e ? e.length : 0;
            break;
          case 33309:
            if (2 > U.version) {
              Y(1282);
              return;
            }
            d = 2 * (L.getSupportedExtensions() || []).length;
            break;
          case 33307:
          case 33308:
            if (2 > U.version) {
              Y(1280);
              return;
            }
            d = 33307 == a ? 3 : 0;
        }
        if (void 0 === d)
          switch (((e = L.getParameter(a)), typeof e)) {
            case "number":
              d = e;
              break;
            case "boolean":
              d = e ? 1 : 0;
              break;
            case "string":
              Y(1280);
              return;
            case "object":
              if (null === e)
                switch (a) {
                  case 34964:
                  case 35725:
                  case 34965:
                  case 36006:
                  case 36007:
                  case 32873:
                  case 34229:
                  case 36662:
                  case 36663:
                  case 35053:
                  case 35055:
                  case 36010:
                  case 35097:
                  case 35869:
                  case 32874:
                  case 36389:
                  case 35983:
                  case 35368:
                  case 34068:
                    d = 0;
                    break;
                  default:
                    Y(1280);
                    return;
                }
              else {
                if (
                  e instanceof Float32Array ||
                  e instanceof Uint32Array ||
                  e instanceof Int32Array ||
                  e instanceof Array
                ) {
                  for (a = 0; a < e.length; ++a)
                    switch (c) {
                      case 0:
                        v[(b + 4 * a) >> 2] = e[a];
                        break;
                      case 2:
                        G[(b + 4 * a) >> 2] = e[a];
                        break;
                      case 4:
                        db[(b + a) >> 0] = e[a] ? 1 : 0;
                    }
                  return;
                }
                try {
                  d = e.name | 0;
                } catch (h) {
                  Y(1280);
                  Ga(
                    "GL_INVALID_ENUM in glGet" +
                      c +
                      "v: Unknown object returned from WebGL getParameter(" +
                      a +
                      ")! (error: " +
                      h +
                      ")"
                  );
                  return;
                }
              }
              break;
            default:
              Y(1280);
              Ga(
                "GL_INVALID_ENUM in glGet" +
                  c +
                  "v: Native code calling glGet" +
                  c +
                  "v(" +
                  a +
                  ") and it returns " +
                  e +
                  " of type " +
                  typeof e +
                  "!"
              );
              return;
          }
        switch (c) {
          case 1:
            te(b, d);
            break;
          case 0:
            v[b >> 2] = d;
            break;
          case 2:
            G[b >> 2] = d;
            break;
          case 4:
            db[b >> 0] = d ? 1 : 0;
        }
      } else Y(1281);
    }
    function ve(a, b, c, d) {
      if (c) {
        b = L.getIndexedParameter(a, b);
        switch (typeof b) {
          case "boolean":
            a = b ? 1 : 0;
            break;
          case "number":
            a = b;
            break;
          case "object":
            if (null === b)
              switch (a) {
                case 35983:
                case 35368:
                  a = 0;
                  break;
                default:
                  Y(1280);
                  return;
              }
            else if (b instanceof WebGLBuffer) a = b.name | 0;
            else {
              Y(1280);
              return;
            }
            break;
          default:
            Y(1280);
            return;
        }
        switch (d) {
          case 1:
            te(c, a);
            break;
          case 0:
            v[c >> 2] = a;
            break;
          case 2:
            G[c >> 2] = a;
            break;
          case 4:
            db[c >> 0] = a ? 1 : 0;
            break;
          default:
            throw "internal emscriptenWebGLGetIndexed() error, bad type: " + d;
        }
      } else Y(1281);
    }
    function we(a) {
      var b = ea(a) + 1,
        c = cb(b);
      fa(a, c, b);
      return c;
    }
    function xe(a, b, c, d) {
      if (c)
        if (
          ((a = L.getUniform(N[a], R[b])),
          "number" == typeof a || "boolean" == typeof a)
        )
          switch (d) {
            case 0:
              v[c >> 2] = a;
              break;
            case 2:
              G[c >> 2] = a;
              break;
            default:
              throw (
                "internal emscriptenWebGLGetUniform() error, bad type: " + d
              );
          }
        else
          for (b = 0; b < a.length; b++)
            switch (d) {
              case 0:
                v[(c + 4 * b) >> 2] = a[b];
                break;
              case 2:
                G[(c + 4 * b) >> 2] = a[b];
                break;
              default:
                throw (
                  "internal emscriptenWebGLGetUniform() error, bad type: " + d
                );
            }
      else Y(1281);
    }
    function ye(a, b, c, d) {
      if (c)
        if (((a = L.getVertexAttrib(a, b)), 34975 == b))
          v[c >> 2] = a && a.name;
        else if ("number" == typeof a || "boolean" == typeof a)
          switch (d) {
            case 0:
              v[c >> 2] = a;
              break;
            case 2:
              G[c >> 2] = a;
              break;
            case 5:
              v[c >> 2] = Math.fround(a);
              break;
            default:
              throw (
                "internal emscriptenWebGLGetVertexAttrib() error, bad type: " +
                d
              );
          }
        else
          for (b = 0; b < a.length; b++)
            switch (d) {
              case 0:
                v[(c + 4 * b) >> 2] = a[b];
                break;
              case 2:
                G[(c + 4 * b) >> 2] = a[b];
                break;
              case 5:
                v[(c + 4 * b) >> 2] = Math.fround(a[b]);
                break;
              default:
                throw (
                  "internal emscriptenWebGLGetVertexAttrib() error, bad type: " +
                  d
                );
            }
      else Y(1281);
    }
    function ze(a) {
      a -= 5120;
      return 0 == a
        ? db
        : 1 == a
        ? k
        : 2 == a
        ? Va
        : 4 == a
        ? v
        : 6 == a
        ? G
        : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a
        ? fb
        : Ua;
    }
    function Ae(a) {
      return 31 - Math.clz32(a.BYTES_PER_ELEMENT);
    }
    function Be(a, b, c, d, e) {
      a = ze(a);
      var h = Ae(a),
        n = he;
      return a.subarray(
        e >> h,
        (e +
          d *
            ((c *
              ({
                5: 3,
                6: 4,
                8: 2,
                29502: 3,
                29504: 4,
                26917: 2,
                26918: 2,
                29846: 3,
                29847: 4,
              }[b - 6402] || 1) *
              (1 << h) +
              n -
              1) &
              -n)) >>
          h
      );
    }
    var Ce = 0;
    function De(a, b, c, d) {
      a |= 0;
      b |= 0;
      c |= 0;
      d |= 0;
      var e = 0;
      Ce = (Ce + 1) | 0;
      for (v[a >> 2] = Ce; (e | 0) < (d | 0); ) {
        if (0 == (v[(c + (e << 3)) >> 2] | 0))
          return (
            (v[(c + (e << 3)) >> 2] = Ce),
            (v[(c + ((e << 3) + 4)) >> 2] = b),
            (v[(c + ((e << 3) + 8)) >> 2] = 0),
            (Ja = d | 0),
            c | 0
          );
        e = (e + 1) | 0;
      }
      d = (2 * d) | 0;
      c = Ee(c | 0, (8 * ((d + 1) | 0)) | 0) | 0;
      c = De(a | 0, b | 0, c | 0, d | 0) | 0;
      Ja = d | 0;
      return c | 0;
    }
    var Fe = {};
    function Ge() {
      if (!He) {
        var a = {
            USER: "web_user",
            LOGNAME: "web_user",
            PATH: "/",
            PWD: "/",
            HOME: "/home/web_user",
            LANG:
              (
                ("object" === typeof navigator &&
                  navigator.languages &&
                  navigator.languages[0]) ||
                "C"
              ).replace("-", "_") + ".UTF-8",
            _: la || "./this.program",
          },
          b;
        for (b in Fe) a[b] = Fe[b];
        var c = [];
        for (b in a) c.push(b + "=" + a[b]);
        He = c;
      }
      return He;
    }
    var He;
    function Ie(a) {
      return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
    }
    function Je(a, b) {
      for (var c = 0, d = 0; d <= b; c += a[d++]);
      return c;
    }
    var Ke = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Le = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function Me(a, b) {
      for (a = new Date(a.getTime()); 0 < b; ) {
        var c = a.getMonth(),
          d = (Ie(a.getFullYear()) ? Ke : Le)[c];
        if (b > d - a.getDate())
          (b -= d - a.getDate() + 1),
            a.setDate(1),
            11 > c
              ? a.setMonth(c + 1)
              : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1));
        else {
          a.setDate(a.getDate() + b);
          break;
        }
      }
      return a;
    }
    function Ne(a, b, c, d) {
      function e(x, P, Z) {
        for (x = "number" === typeof x ? x.toString() : x || ""; x.length < P; )
          x = Z[0] + x;
        return x;
      }
      function h(x, P) {
        return e(x, P, "0");
      }
      function n(x, P) {
        function Z(qa) {
          return 0 > qa ? -1 : 0 < qa ? 1 : 0;
        }
        var da;
        0 === (da = Z(x.getFullYear() - P.getFullYear())) &&
          0 === (da = Z(x.getMonth() - P.getMonth())) &&
          (da = Z(x.getDate() - P.getDate()));
        return da;
      }
      function q(x) {
        switch (x.getDay()) {
          case 0:
            return new Date(x.getFullYear() - 1, 11, 29);
          case 1:
            return x;
          case 2:
            return new Date(x.getFullYear(), 0, 3);
          case 3:
            return new Date(x.getFullYear(), 0, 2);
          case 4:
            return new Date(x.getFullYear(), 0, 1);
          case 5:
            return new Date(x.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(x.getFullYear() - 1, 11, 30);
        }
      }
      function u(x) {
        x = Me(new Date(x.zk + 1900, 0, 1), x.Dl);
        var P = new Date(x.getFullYear() + 1, 0, 4),
          Z = q(new Date(x.getFullYear(), 0, 4));
        P = q(P);
        return 0 >= n(Z, x)
          ? 0 >= n(P, x)
            ? x.getFullYear() + 1
            : x.getFullYear()
          : x.getFullYear() - 1;
      }
      var A = v[(d + 40) >> 2];
      d = {
        Tm: v[d >> 2],
        Sm: v[(d + 4) >> 2],
        Bl: v[(d + 8) >> 2],
        sl: v[(d + 12) >> 2],
        il: v[(d + 16) >> 2],
        zk: v[(d + 20) >> 2],
        Cl: v[(d + 24) >> 2],
        Dl: v[(d + 28) >> 2],
        jn: v[(d + 32) >> 2],
        Rm: v[(d + 36) >> 2],
        Um: A ? Qa(A) : "",
      };
      c = Qa(c);
      A = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y",
      };
      for (var C in A) c = c.replace(new RegExp(C, "g"), A[C]);
      var M = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
          " "
        ),
        Q =
          "January February March April May June July August September October November December".split(
            " "
          );
      A = {
        "%a": function (x) {
          return M[x.Cl].substring(0, 3);
        },
        "%A": function (x) {
          return M[x.Cl];
        },
        "%b": function (x) {
          return Q[x.il].substring(0, 3);
        },
        "%B": function (x) {
          return Q[x.il];
        },
        "%C": function (x) {
          return h(((x.zk + 1900) / 100) | 0, 2);
        },
        "%d": function (x) {
          return h(x.sl, 2);
        },
        "%e": function (x) {
          return e(x.sl, 2, " ");
        },
        "%g": function (x) {
          return u(x).toString().substring(2);
        },
        "%G": function (x) {
          return u(x);
        },
        "%H": function (x) {
          return h(x.Bl, 2);
        },
        "%I": function (x) {
          x = x.Bl;
          0 == x ? (x = 12) : 12 < x && (x -= 12);
          return h(x, 2);
        },
        "%j": function (x) {
          return h(x.sl + Je(Ie(x.zk + 1900) ? Ke : Le, x.il - 1), 3);
        },
        "%m": function (x) {
          return h(x.il + 1, 2);
        },
        "%M": function (x) {
          return h(x.Sm, 2);
        },
        "%n": function () {
          return "\n";
        },
        "%p": function (x) {
          return 0 <= x.Bl && 12 > x.Bl ? "AM" : "PM";
        },
        "%S": function (x) {
          return h(x.Tm, 2);
        },
        "%t": function () {
          return "\t";
        },
        "%u": function (x) {
          return x.Cl || 7;
        },
        "%U": function (x) {
          var P = new Date(x.zk + 1900, 0, 1),
            Z = 0 === P.getDay() ? P : Me(P, 7 - P.getDay());
          x = new Date(x.zk + 1900, x.il, x.sl);
          return 0 > n(Z, x)
            ? h(
                Math.ceil(
                  (31 -
                    Z.getDate() +
                    (Je(Ie(x.getFullYear()) ? Ke : Le, x.getMonth() - 1) - 31) +
                    x.getDate()) /
                    7
                ),
                2
              )
            : 0 === n(Z, P)
            ? "01"
            : "00";
        },
        "%V": function (x) {
          var P = new Date(x.zk + 1901, 0, 4),
            Z = q(new Date(x.zk + 1900, 0, 4));
          P = q(P);
          var da = Me(new Date(x.zk + 1900, 0, 1), x.Dl);
          return 0 > n(da, Z)
            ? "53"
            : 0 >= n(P, da)
            ? "01"
            : h(
                Math.ceil(
                  (Z.getFullYear() < x.zk + 1900
                    ? x.Dl + 32 - Z.getDate()
                    : x.Dl + 1 - Z.getDate()) / 7
                ),
                2
              );
        },
        "%w": function (x) {
          return x.Cl;
        },
        "%W": function (x) {
          var P = new Date(x.zk, 0, 1),
            Z =
              1 === P.getDay()
                ? P
                : Me(P, 0 === P.getDay() ? 1 : 7 - P.getDay() + 1);
          x = new Date(x.zk + 1900, x.il, x.sl);
          return 0 > n(Z, x)
            ? h(
                Math.ceil(
                  (31 -
                    Z.getDate() +
                    (Je(Ie(x.getFullYear()) ? Ke : Le, x.getMonth() - 1) - 31) +
                    x.getDate()) /
                    7
                ),
                2
              )
            : 0 === n(Z, P)
            ? "01"
            : "00";
        },
        "%y": function (x) {
          return (x.zk + 1900).toString().substring(2);
        },
        "%Y": function (x) {
          return x.zk + 1900;
        },
        "%z": function (x) {
          x = x.Rm;
          var P = 0 <= x;
          x = Math.abs(x) / 60;
          return (
            (P ? "+" : "-") +
            String("0000" + ((x / 60) * 100 + (x % 60))).slice(-4)
          );
        },
        "%Z": function (x) {
          return x.Um;
        },
        "%%": function () {
          return "%";
        },
      };
      for (C in A)
        0 <= c.indexOf(C) && (c = c.replace(new RegExp(C, "g"), A[C](d)));
      C = Oe(c);
      if (C.length > b) return 0;
      db.set(C, a);
      return C.length - 1;
    }
    Sb = g.InternalError = Rb("InternalError");
    for (var Pe = Array(256), Qe = 0; 256 > Qe; ++Qe)
      Pe[Qe] = String.fromCharCode(Qe);
    Yb = Pe;
    $b = g.BindingError = Rb("BindingError");
    lc.prototype.isAliasOf = function (a) {
      if (!(this instanceof lc && a instanceof lc)) return !1;
      var b = this.ik.tk.mk,
        c = this.ik.pk,
        d = a.ik.tk.mk;
      for (a = a.ik.pk; b.Ik; ) (c = b.tl(c)), (b = b.Ik);
      for (; d.Ik; ) (a = d.tl(a)), (d = d.Ik);
      return b === d && c === a;
    };
    lc.prototype.clone = function () {
      this.ik.pk || cc(this);
      if (this.ik.ql) return (this.ik.count.value += 1), this;
      var a = hc(
        Object.create(Object.getPrototypeOf(this), {
          ik: { value: bc(this.ik) },
        })
      );
      a.ik.count.value += 1;
      a.ik.gl = !1;
      return a;
    };
    lc.prototype["delete"] = function () {
      this.ik.pk || cc(this);
      this.ik.gl && !this.ik.ql && ac("Object already scheduled for deletion");
      ec(this);
      fc(this.ik);
      this.ik.ql || ((this.ik.Ck = void 0), (this.ik.pk = void 0));
    };
    lc.prototype.isDeleted = function () {
      return !this.ik.pk;
    };
    lc.prototype.deleteLater = function () {
      this.ik.pk || cc(this);
      this.ik.gl && !this.ik.ql && ac("Object already scheduled for deletion");
      jc.push(this);
      1 === jc.length && ic && ic(kc);
      this.ik.gl = !0;
      return this;
    };
    Ac.prototype.rm = function (a) {
      this.am && (a = this.am(a));
      return a;
    };
    Ac.prototype.Vl = function (a) {
      this.Fk && this.Fk(a);
    };
    Ac.prototype.argPackAdvance = 8;
    Ac.prototype.readValueFromPointer = Lb;
    Ac.prototype.deleteObject = function (a) {
      if (null !== a) a["delete"]();
    };
    Ac.prototype.fromWireType = function (a) {
      function b() {
        return this.zl
          ? zc(this.mk.hl, { tk: this.Gm, pk: c, Gk: this, Ck: a })
          : zc(this.mk.hl, { tk: this, pk: a });
      }
      var c = this.rm(a);
      if (!c) return this.Vl(a), null;
      var d = yc(this.mk, c);
      if (void 0 !== d) {
        if (0 === d.ik.count.value)
          return (d.ik.pk = c), (d.ik.Ck = a), d.clone();
        d = d.clone();
        this.Vl(a);
        return d;
      }
      d = this.mk.qm(c);
      d = mc[d];
      if (!d) return b.call(this);
      d = this.yl ? d.im : d.pointerType;
      var e = wc(c, this.mk, d.mk);
      return null === e
        ? b.call(this)
        : this.zl
        ? zc(d.mk.hl, { tk: d, pk: e, Gk: this, Ck: a })
        : zc(d.mk.hl, { tk: d, pk: e });
    };
    g.getInheritedInstanceCount = function () {
      return Object.keys(xc).length;
    };
    g.getLiveInheritedInstances = function () {
      var a = [],
        b;
      for (b in xc) xc.hasOwnProperty(b) && a.push(xc[b]);
      return a;
    };
    g.flushPendingDeletes = kc;
    g.setDelayFunction = function (a) {
      ic = a;
      jc.length && ic && ic(kc);
    };
    Fc = g.UnboundTypeError = Rb("UnboundTypeError");
    g.count_emval_handles = function () {
      for (var a = 0, b = 5; b < Oc.length; ++b) void 0 !== Oc[b] && ++a;
      return a;
    };
    g.get_first_emval = function () {
      for (var a = 5; a < Oc.length; ++a) if (void 0 !== Oc[a]) return Oc[a];
      return null;
    };
    g.requestFullscreen = function (a, b) {
      Id(a, b);
    };
    g.requestAnimationFrame = function (a) {
      gd(a);
    };
    g.setCanvasSize = function (a, b, c) {
      Kd(g.canvas, a, b);
      c || Ld();
    };
    g.pauseMainLoop = function () {
      dd = null;
      jd++;
    };
    g.resumeMainLoop = function () {
      jd++;
      var a = ad,
        b = bd,
        c = cd;
      cd = null;
      hd(c);
      $c(a, b);
      dd();
    };
    g.getUserMedia = function () {
      window.getUserMedia ||
        (window.getUserMedia =
          navigator.getUserMedia || navigator.mozGetUserMedia);
      window.getUserMedia(void 0);
    };
    g.createContext = function (a, b, c, d) {
      return Ad(a, b, c, d);
    };
    for (var L, Re = new Float32Array(256), Se = 0; 256 > Se; Se++)
      je[Se] = Re.subarray(0, Se + 1);
    var Te = new Int32Array(256);
    for (Se = 0; 256 > Se; Se++) ke[Se] = Te.subarray(0, Se + 1);
    for (var Ue = 0; 32 > Ue; Ue++) qe.push(Array(Ue));
    function Oe(a) {
      var b = Array(ea(a) + 1);
      Ra(a, b, 0, b.length);
      return b;
    }
    var pf = {
        Ie: function (a) {
          return cb(a);
        },
        xe: function (a) {
          "uncaught_exception" in Fb ? Fb.Yl++ : (Fb.Yl = 1);
          throw a;
        },
        Cg: function () {
          v[Ve() >> 2] = 63;
          return -1;
        },
        P: function () {
          return 0;
        },
        Fg: function () {},
        Eg: function () {
          return 0;
        },
        Hg: function (a, b, c, d, e, h) {
          h <<= 12;
          0 !== (d & 16) && 0 !== a % 16384
            ? (b = -28)
            : 0 !== (d & 32)
            ? (a = We(16384, b))
              ? (Xe(a, 0, b),
                (Gb[a] = {
                  Em: a,
                  Cm: b,
                  hm: !0,
                  fd: e,
                  hn: c,
                  flags: d,
                  offset: h,
                }),
                (b = a))
              : (b = -48)
            : (b = -52);
          return b;
        },
        Gg: function (a, b) {
          if (-1 === (a | 0) || 0 === b) a = -28;
          else {
            var c = Gb[a];
            c && b === c.Cm && ((Gb[a] = null), c.hm && Ic(c.Em));
            a = 0;
          }
          return a;
        },
        Q: function () {},
        Ig: function () {},
        R: function () {},
        G: function (a) {
          var b = Jb[a];
          delete Jb[a];
          var c = b.elements,
            d = c.length,
            e = c
              .map(function (q) {
                return q.Ml;
              })
              .concat(
                c.map(function (q) {
                  return q.Ql;
                })
              ),
            h = b.rl,
            n = b.Fk;
          Ub([a], e, function (q) {
            c.forEach(function (u, A) {
              var C = q[A],
                M = u.Kl,
                Q = u.Ll,
                x = q[A + d],
                P = u.Pl,
                Z = u.Rl;
              u.read = function (da) {
                return C.fromWireType(M(Q, da));
              };
              u.write = function (da, qa) {
                var ia = [];
                P(Z, da, x.toWireType(ia, qa));
                Kb(ia);
              };
            });
            return [
              {
                name: b.name,
                fromWireType: function (u) {
                  for (var A = Array(d), C = 0; C < d; ++C) A[C] = c[C].read(u);
                  n(u);
                  return A;
                },
                toWireType: function (u, A) {
                  if (d !== A.length)
                    throw new TypeError(
                      "Incorrect number of tuple elements for " +
                        b.name +
                        ": expected=" +
                        d +
                        ", actual=" +
                        A.length
                    );
                  for (var C = h(), M = 0; M < d; ++M) c[M].write(C, A[M]);
                  null !== u && u.push(n, C);
                  return C;
                },
                argPackAdvance: 8,
                readValueFromPointer: Lb,
                Bk: n,
              },
            ];
          });
        },
        x: function (a) {
          var b = Wb[a];
          delete Wb[a];
          var c = b.rl,
            d = b.Fk,
            e = b.Wl,
            h = e
              .map(function (n) {
                return n.Ml;
              })
              .concat(
                e.map(function (n) {
                  return n.Ql;
                })
              );
          Ub([a], h, function (n) {
            var q = {};
            e.forEach(function (u, A) {
              var C = n[A],
                M = u.Kl,
                Q = u.Ll,
                x = n[A + e.length],
                P = u.Pl,
                Z = u.Rl;
              q[u.mm] = {
                read: function (da) {
                  return C.fromWireType(M(Q, da));
                },
                write: function (da, qa) {
                  var ia = [];
                  P(Z, da, x.toWireType(ia, qa));
                  Kb(ia);
                },
              };
            });
            return [
              {
                name: b.name,
                fromWireType: function (u) {
                  var A = {},
                    C;
                  for (C in q) A[C] = q[C].read(u);
                  d(u);
                  return A;
                },
                toWireType: function (u, A) {
                  for (var C in q)
                    if (!(C in A)) throw new TypeError("Missing field");
                  var M = c();
                  for (C in q) q[C].write(M, A[C]);
                  null !== u && u.push(d, M);
                  return M;
                },
                argPackAdvance: 8,
                readValueFromPointer: Lb,
                Bk: d,
              },
            ];
          });
        },
        Kg: function (a, b, c, d, e) {
          var h = Xb(c);
          b = Zb(b);
          Vb(a, {
            name: b,
            fromWireType: function (n) {
              return !!n;
            },
            toWireType: function (n, q) {
              return q ? d : e;
            },
            argPackAdvance: 8,
            readValueFromPointer: function (n) {
              if (1 === c) var q = db;
              else if (2 === c) q = Va;
              else if (4 === c) q = v;
              else throw new TypeError("Unknown boolean type size: " + b);
              return this.fromWireType(q[n >> h]);
            },
            Bk: null,
          });
        },
        l: function (a, b, c, d, e, h, n, q, u, A, C, M, Q) {
          C = Zb(C);
          h = Cc(e, h);
          q && (q = Cc(n, q));
          A && (A = Cc(u, A));
          Q = Cc(M, Q);
          var x = Pb(C);
          oc(x, function () {
            Jc("Cannot construct " + C + " due to unbound types", [d]);
          });
          Ub([a, b, c], d ? [d] : [], function (P) {
            P = P[0];
            if (d) {
              var Z = P.mk;
              var da = Z.hl;
            } else da = lc.prototype;
            P = Qb(x, function () {
              if (Object.getPrototypeOf(this) !== qa)
                throw new $b("Use 'new' to construct " + C);
              if (void 0 === ia.Rk)
                throw new $b(C + " has no accessible constructor");
              var Wa = ia.Rk[arguments.length];
              if (void 0 === Wa)
                throw new $b(
                  "Tried to invoke ctor of " +
                    C +
                    " with invalid number of parameters (" +
                    arguments.length +
                    ") - expected (" +
                    Object.keys(ia.Rk).toString() +
                    ") parameters instead!"
                );
              return Wa.apply(this, arguments);
            });
            var qa = Object.create(da, { constructor: { value: P } });
            P.prototype = qa;
            var ia = new pc(C, P, qa, Q, Z, h, q, A);
            Z = new Ac(C, ia, !0, !1, !1);
            da = new Ac(C + "*", ia, !1, !1, !1);
            var gb = new Ac(C + " const*", ia, !1, !0, !1);
            mc[a] = { pointerType: da, im: gb };
            Bc(x, P);
            return [Z, da, gb];
          });
        },
        m: function (a, b, c, d, e, h, n) {
          var q = Mc(c, d);
          b = Zb(b);
          h = Cc(e, h);
          Ub([], [a], function (u) {
            function A() {
              Jc("Cannot call " + C + " due to unbound types", q);
            }
            u = u[0];
            var C = u.name + "." + b,
              M = u.mk.constructor;
            void 0 === M[b]
              ? ((A.fl = c - 1), (M[b] = A))
              : (nc(M, b, C), (M[b].wk[c - 1] = A));
            Ub([], q, function (Q) {
              Q = [Q[0], null].concat(Q.slice(1));
              Q = Lc(C, Q, null, h, n);
              void 0 === M[b].wk
                ? ((Q.fl = c - 1), (M[b] = Q))
                : (M[b].wk[c - 1] = Q);
              return [];
            });
            return [];
          });
        },
        w: function (a, b, c, d, e, h) {
          assert(0 < b);
          var n = Mc(b, c);
          e = Cc(d, e);
          var q = [h],
            u = [];
          Ub([], [a], function (A) {
            A = A[0];
            var C = "constructor " + A.name;
            void 0 === A.mk.Rk && (A.mk.Rk = []);
            if (void 0 !== A.mk.Rk[b - 1])
              throw new $b(
                "Cannot register multiple constructors with identical number of parameters (" +
                  (b - 1) +
                  ") for class '" +
                  A.name +
                  "'! Overload resolution is currently only performed using the parameter count, not actual type info!"
              );
            A.mk.Rk[b - 1] = function () {
              Jc("Cannot construct " + A.name + " due to unbound types", n);
            };
            Ub([], n, function (M) {
              A.mk.Rk[b - 1] = function () {
                arguments.length !== b - 1 &&
                  ac(
                    C +
                      " called with " +
                      arguments.length +
                      " arguments, expected " +
                      (b - 1)
                  );
                u.length = 0;
                q.length = b;
                for (var Q = 1; Q < b; ++Q)
                  q[Q] = M[Q].toWireType(u, arguments[Q - 1]);
                Q = e.apply(null, q);
                Kb(u);
                return M[0].fromWireType(Q);
              };
              return [];
            });
            return [];
          });
        },
        d: function (a, b, c, d, e, h, n, q) {
          var u = Mc(c, d);
          b = Zb(b);
          h = Cc(e, h);
          Ub([], [a], function (A) {
            function C() {
              Jc("Cannot call " + M + " due to unbound types", u);
            }
            A = A[0];
            var M = A.name + "." + b;
            q && A.mk.Hm.push(b);
            var Q = A.mk.hl,
              x = Q[b];
            void 0 === x ||
            (void 0 === x.wk && x.className !== A.name && x.fl === c - 2)
              ? ((C.fl = c - 2), (C.className = A.name), (Q[b] = C))
              : (nc(Q, b, M), (Q[b].wk[c - 2] = C));
            Ub([], u, function (P) {
              P = Lc(M, P, A, h, n);
              void 0 === Q[b].wk
                ? ((P.fl = c - 2), (Q[b] = P))
                : (Q[b].wk[c - 2] = P);
              return [];
            });
            return [];
          });
        },
        X: function (a, b, c) {
          a = Zb(a);
          Ub([], [b], function (d) {
            d = d[0];
            g[a] = d.fromWireType(c);
            return [];
          });
        },
        Jg: function (a, b) {
          b = Zb(b);
          Vb(a, {
            name: b,
            fromWireType: function (c) {
              var d = Oc[c].value;
              Pc(c);
              return d;
            },
            toWireType: function (c, d) {
              return uc(d);
            },
            argPackAdvance: 8,
            readValueFromPointer: Lb,
            Bk: null,
          });
        },
        o: function (a, b, c, d) {
          function e() {}
          c = Xb(c);
          b = Zb(b);
          e.values = {};
          Vb(a, {
            name: b,
            constructor: e,
            fromWireType: function (h) {
              return this.constructor.values[h];
            },
            toWireType: function (h, n) {
              return n.value;
            },
            argPackAdvance: 8,
            readValueFromPointer: Qc(b, c, d),
            Bk: null,
          });
          oc(b, e);
        },
        n: function (a, b, c) {
          var d = Rc(a, "enum");
          b = Zb(b);
          a = d.constructor;
          d = Object.create(d.constructor.prototype, {
            value: { value: c },
            constructor: { value: Qb(d.name + "_" + b, function () {}) },
          });
          a.values[c] = d;
          a[b] = d;
        },
        S: function (a, b, c) {
          c = Xb(c);
          b = Zb(b);
          Vb(a, {
            name: b,
            fromWireType: function (d) {
              return d;
            },
            toWireType: function (d, e) {
              if ("number" !== typeof e && "boolean" !== typeof e)
                throw new TypeError(
                  'Cannot convert "' + sc(e) + '" to ' + this.name
                );
              return e;
            },
            argPackAdvance: 8,
            readValueFromPointer: Sc(b, c),
            Bk: null,
          });
        },
        p: function (a, b, c, d, e, h) {
          var n = Mc(b, c);
          a = Zb(a);
          e = Cc(d, e);
          oc(
            a,
            function () {
              Jc("Cannot call " + a + " due to unbound types", n);
            },
            b - 1
          );
          Ub([], n, function (q) {
            q = [q[0], null].concat(q.slice(1));
            Bc(a, Lc(a, q, null, e, h), b - 1);
            return [];
          });
        },
        A: function (a, b, c, d, e) {
          function h(A) {
            return A;
          }
          b = Zb(b);
          -1 === e && (e = 4294967295);
          var n = Xb(c);
          if (0 === d) {
            var q = 32 - 8 * c;
            h = function (A) {
              return (A << q) >>> q;
            };
          }
          var u = -1 != b.indexOf("unsigned");
          Vb(a, {
            name: b,
            fromWireType: h,
            toWireType: function (A, C) {
              if ("number" !== typeof C && "boolean" !== typeof C)
                throw new TypeError(
                  'Cannot convert "' + sc(C) + '" to ' + this.name
                );
              if (C < d || C > e)
                throw new TypeError(
                  'Passing a number "' +
                    sc(C) +
                    '" from JS side to C/C++ side to an argument of type "' +
                    b +
                    '", which is outside the valid range [' +
                    d +
                    ", " +
                    e +
                    "]!"
                );
              return u ? C >>> 0 : C | 0;
            },
            argPackAdvance: 8,
            readValueFromPointer: Tc(b, n, 0 !== d),
            Bk: null,
          });
        },
        z: function (a, b, c) {
          function d(h) {
            h >>= 2;
            var n = fb;
            return new e(eb, n[h + 1], n[h]);
          }
          var e = [
            Int8Array,
            Uint8Array,
            Int16Array,
            Uint16Array,
            Int32Array,
            Uint32Array,
            Float32Array,
            Float64Array,
          ][b];
          c = Zb(c);
          Vb(
            a,
            {
              name: c,
              fromWireType: d,
              argPackAdvance: 8,
              readValueFromPointer: d,
            },
            { um: !0 }
          );
        },
        t: function (a, b, c, d, e, h, n, q, u, A, C, M) {
          c = Zb(c);
          h = Cc(e, h);
          q = Cc(n, q);
          A = Cc(u, A);
          M = Cc(C, M);
          Ub([a], [b], function (Q) {
            Q = Q[0];
            return [new Ac(c, Q.mk, !1, !1, !0, Q, d, h, q, A, M)];
          });
        },
        T: function (a, b) {
          b = Zb(b);
          var c = "std::string" === b;
          Vb(a, {
            name: b,
            fromWireType: function (d) {
              var e = fb[d >> 2];
              if (c)
                for (var h = d + 4, n = 0; n <= e; ++n) {
                  var q = d + 4 + n;
                  if (0 == k[q] || n == e) {
                    h = Qa(h, q - h);
                    if (void 0 === u) var u = h;
                    else (u += String.fromCharCode(0)), (u += h);
                    h = q + 1;
                  }
                }
              else {
                u = Array(e);
                for (n = 0; n < e; ++n)
                  u[n] = String.fromCharCode(k[d + 4 + n]);
                u = u.join("");
              }
              Ic(d);
              return u;
            },
            toWireType: function (d, e) {
              e instanceof ArrayBuffer && (e = new Uint8Array(e));
              var h = "string" === typeof e;
              h ||
                e instanceof Uint8Array ||
                e instanceof Uint8ClampedArray ||
                e instanceof Int8Array ||
                ac("Cannot pass non-string to std::string");
              var n = (
                  c && h
                    ? function () {
                        return ea(e);
                      }
                    : function () {
                        return e.length;
                      }
                )(),
                q = cb(4 + n + 1);
              fb[q >> 2] = n;
              if (c && h) fa(e, q + 4, n + 1);
              else if (h)
                for (h = 0; h < n; ++h) {
                  var u = e.charCodeAt(h);
                  255 < u &&
                    (Ic(q),
                    ac(
                      "String has UTF-16 code units that do not fit in 8 bits"
                    ));
                  k[q + 4 + h] = u;
                }
              else for (h = 0; h < n; ++h) k[q + 4 + h] = e[h];
              null !== d && d.push(Ic, q);
              return q;
            },
            argPackAdvance: 8,
            readValueFromPointer: Lb,
            Bk: function (d) {
              Ic(d);
            },
          });
        },
        K: function (a, b, c) {
          c = Zb(c);
          if (2 === b) {
            var d = Ta;
            var e = Xa;
            var h = Ya;
            var n = function () {
              return Ua;
            };
            var q = 1;
          } else
            4 === b &&
              ((d = Za),
              (e = $a),
              (h = ab),
              (n = function () {
                return fb;
              }),
              (q = 2));
          Vb(a, {
            name: c,
            fromWireType: function (u) {
              for (
                var A = fb[u >> 2], C = n(), M, Q = u + 4, x = 0;
                x <= A;
                ++x
              ) {
                var P = u + 4 + x * b;
                if (0 == C[P >> q] || x == A)
                  (Q = d(Q, P - Q)),
                    void 0 === M
                      ? (M = Q)
                      : ((M += String.fromCharCode(0)), (M += Q)),
                    (Q = P + b);
              }
              Ic(u);
              return M;
            },
            toWireType: function (u, A) {
              "string" !== typeof A &&
                ac("Cannot pass non-string to C++ string type " + c);
              var C = h(A),
                M = cb(4 + C + b);
              fb[M >> 2] = C >> q;
              e(A, M + 4, C + b);
              null !== u && u.push(Ic, M);
              return M;
            },
            argPackAdvance: 8,
            readValueFromPointer: Lb,
            Bk: function (u) {
              Ic(u);
            },
          });
        },
        I: function (a, b, c, d, e, h) {
          Jb[a] = { name: Zb(b), rl: Cc(c, d), Fk: Cc(e, h), elements: [] };
        },
        H: function (a, b, c, d, e, h, n, q, u) {
          Jb[a].elements.push({
            Ml: b,
            Kl: Cc(c, d),
            Ll: e,
            Ql: h,
            Pl: Cc(n, q),
            Rl: u,
          });
        },
        y: function (a, b, c, d, e, h) {
          Wb[a] = { name: Zb(b), rl: Cc(c, d), Fk: Cc(e, h), Wl: [] };
        },
        h: function (a, b, c, d, e, h, n, q, u, A) {
          Wb[a].Wl.push({
            mm: Zb(b),
            Ml: c,
            Kl: Cc(d, e),
            Ll: h,
            Ql: n,
            Pl: Cc(q, u),
            Rl: A,
          });
        },
        Lg: function (a, b) {
          b = Zb(b);
          Vb(a, {
            xm: !0,
            name: b,
            argPackAdvance: 0,
            fromWireType: function () {},
            toWireType: function () {},
          });
        },
        C: function (a, b, c, d) {
          a = Wc[a];
          b || ac("Cannot use deleted val. handle = " + b);
          b = Oc[b].value;
          c = Vc(c);
          a(b, c, null, d);
        },
        ta: Pc,
        B: function (a, b) {
          b = Yc(a, b);
          for (
            var c = b[0],
              d =
                c.name +
                "_$" +
                b
                  .slice(1)
                  .map(function (A) {
                    return A.name;
                  })
                  .join("_") +
                "$",
              e = ["retType"],
              h = [c],
              n = "",
              q = 0;
            q < a - 1;
            ++q
          )
            (n += (0 !== q ? ", " : "") + "arg" + q),
              e.push("argType" + q),
              h.push(b[1 + q]);
          d =
            "return function " +
            Pb("methodCaller_" + d) +
            "(handle, name, destructors, args) {\n";
          var u = 0;
          for (q = 0; q < a - 1; ++q)
            (d +=
              "    var arg" +
              q +
              " = argType" +
              q +
              ".readValueFromPointer(args" +
              (u ? "+" + u : "") +
              ");\n"),
              (u += b[q + 1].argPackAdvance);
          d += "    var rv = handle[name](" + n + ");\n";
          for (q = 0; q < a - 1; ++q)
            b[q + 1].deleteObject &&
              (d += "    argType" + q + ".deleteObject(arg" + q + ");\n");
          c.xm || (d += "    return retType.toWireType(destructors, rv);\n");
          e.push(d + "};\n");
          a = Kc(e).apply(null, h);
          return Xc(a);
        },
        mf: function (a) {
          4 < a && (Oc[a].Ol += 1);
        },
        Ea: function () {
          return uc([]);
        },
        Za: function (a) {
          return uc(Vc(a));
        },
        E: function (a, b) {
          a = Rc(a, "_emval_take_value");
          a = a.readValueFromPointer(b);
          return uc(a);
        },
        e: function () {
          Ea();
        },
        yg: function (a, b) {
          if (0 === a) a = Date.now();
          else if (1 === a || 4 === a) a = Zc();
          else return (v[Ve() >> 2] = 28), -1;
          v[b >> 2] = (a / 1e3) | 0;
          v[(b + 4) >> 2] = ((a % 1e3) * 1e6) | 0;
          return 0;
        },
        Uc: function () {
          return 0;
        },
        Qg: function (a) {
          return Ye(a);
        },
        Jc: function (a, b) {
          if (62e3 != a) return 0;
          if (Od[b]) return Od[b];
          switch (b) {
            case 12371:
              a = bb("Emscripten");
              break;
            case 12372:
              a = bb("1.4 Emscripten EGL");
              break;
            case 12373:
              a = bb("");
              break;
            case 12429:
              a = bb("OpenGL_ES");
              break;
            default:
              return 0;
          }
          return (Od[b] = a);
        },
        bg: function (a) {
          L.activeTexture(a);
        },
        ag: function (a, b) {
          L.attachShader(N[a], Yd[b]);
        },
        $c: function (a, b) {
          L.beginQuery(a, ae[b]);
        },
        rg: function (a, b) {
          L.Ek.beginQueryEXT(a, $d[b]);
        },
        Gc: function (a) {
          L.beginTransformFeedback(a);
        },
        $f: function (a, b, c) {
          L.bindAttribLocation(N[a], b, Qa(c));
        },
        _f: function (a, b) {
          35051 == a ? (L.Sk = b) : 35052 == a && (L.vk = b);
          L.bindBuffer(a, Ud[b]);
        },
        Dc: function (a, b, c) {
          L.bindBufferBase(a, b, Ud[c]);
        },
        Ec: function (a, b, c, d, e) {
          L.bindBufferRange(a, b, Ud[c], d, e);
        },
        Zf: function (a, b) {
          L.bindFramebuffer(a, Vd[b]);
        },
        Yf: function (a, b) {
          L.bindRenderbuffer(a, Wd[b]);
        },
        Gb: function (a, b) {
          L.bindSampler(a, be[b]);
        },
        Xf: function (a, b) {
          L.bindTexture(a, Xd[b]);
        },
        yb: function (a, b) {
          L.bindTransformFeedback(a, ce[b]);
        },
        Mc: function (a) {
          L.bindVertexArray(Zd[a]);
        },
        jg: function (a) {
          L.bindVertexArray(Zd[a]);
        },
        Wf: function (a, b, c, d) {
          L.blendColor(a, b, c, d);
        },
        Vf: function (a) {
          L.blendEquation(a);
        },
        Uf: function (a, b) {
          L.blendEquationSeparate(a, b);
        },
        Tf: function (a, b) {
          L.blendFunc(a, b);
        },
        Sf: function (a, b, c, d) {
          L.blendFuncSeparate(a, b, c, d);
        },
        Pc: function (a, b, c, d, e, h, n, q, u, A) {
          L.blitFramebuffer(a, b, c, d, e, h, n, q, u, A);
        },
        Rf: function (a, b, c, d) {
          2 <= U.version
            ? c
              ? L.bufferData(a, k, d, c, b)
              : L.bufferData(a, b, d)
            : L.bufferData(a, c ? k.subarray(c, c + b) : b, d);
        },
        Qf: function (a, b, c, d) {
          2 <= U.version
            ? L.bufferSubData(a, b, k, d, c)
            : L.bufferSubData(a, b, k.subarray(d, d + c));
        },
        Pf: function (a) {
          return L.checkFramebufferStatus(a);
        },
        Of: function (a) {
          L.clear(a);
        },
        ec: function (a, b, c, d) {
          L.clearBufferfi(a, b, c, d);
        },
        fc: function (a, b, c) {
          L.clearBufferfv(a, b, G, c >> 2);
        },
        hc: function (a, b, c) {
          L.clearBufferiv(a, b, v, c >> 2);
        },
        gc: function (a, b, c) {
          L.clearBufferuiv(a, b, fb, c >> 2);
        },
        Nf: function (a, b, c, d) {
          L.clearColor(a, b, c, d);
        },
        Mf: function (a) {
          L.clearDepth(a);
        },
        Lf: function (a) {
          L.clearStencil(a);
        },
        Qb: function (a, b, c, d) {
          return L.clientWaitSync(de[a], b, (c >>> 0) + 4294967296 * d);
        },
        Kf: function (a, b, c, d) {
          L.colorMask(!!a, !!b, !!c, !!d);
        },
        Jf: function (a) {
          L.compileShader(Yd[a]);
        },
        If: function (a, b, c, d, e, h, n, q) {
          2 <= U.version
            ? L.vk
              ? L.compressedTexImage2D(a, b, c, d, e, h, n, q)
              : L.compressedTexImage2D(a, b, c, d, e, h, k, q, n)
            : L.compressedTexImage2D(
                a,
                b,
                c,
                d,
                e,
                h,
                q ? k.subarray(q, q + n) : null
              );
        },
        fd: function (a, b, c, d, e, h, n, q, u) {
          L.vk
            ? L.compressedTexImage3D(a, b, c, d, e, h, n, q, u)
            : L.compressedTexImage3D(a, b, c, d, e, h, n, k, u, q);
        },
        Hf: function (a, b, c, d, e, h, n, q, u) {
          2 <= U.version
            ? L.vk
              ? L.compressedTexSubImage2D(a, b, c, d, e, h, n, q, u)
              : L.compressedTexSubImage2D(a, b, c, d, e, h, n, k, u, q)
            : L.compressedTexSubImage2D(
                a,
                b,
                c,
                d,
                e,
                h,
                n,
                u ? k.subarray(u, u + q) : null
              );
        },
        ed: function (a, b, c, d, e, h, n, q, u, A, C) {
          L.vk
            ? L.compressedTexSubImage3D(a, b, c, d, e, h, n, q, u, A, C)
            : L.compressedTexSubImage3D(a, b, c, d, e, h, n, q, u, k, C, A);
        },
        bc: function (a, b, c, d, e) {
          L.copyBufferSubData(a, b, c, d, e);
        },
        Gf: function (a, b, c, d, e, h, n, q) {
          L.copyTexImage2D(a, b, c, d, e, h, n, q);
        },
        Ff: function (a, b, c, d, e, h, n, q) {
          L.copyTexSubImage2D(a, b, c, d, e, h, n, q);
        },
        gd: function (a, b, c, d, e, h, n, q, u) {
          L.copyTexSubImage3D(a, b, c, d, e, h, n, q, u);
        },
        Ef: function () {
          var a = ie(N),
            b = L.createProgram();
          b.name = a;
          N[a] = b;
          return a;
        },
        Df: function (a) {
          var b = ie(Yd);
          Yd[b] = L.createShader(a);
          return b;
        },
        Cf: function (a) {
          L.cullFace(a);
        },
        Bf: function (a, b) {
          for (var c = 0; c < a; c++) {
            var d = v[(b + 4 * c) >> 2],
              e = Ud[d];
            e &&
              (L.deleteBuffer(e),
              (e.name = 0),
              (Ud[d] = null),
              d == oe && (oe = 0),
              d == pe && (pe = 0),
              d == L.Sk && (L.Sk = 0),
              d == L.vk && (L.vk = 0));
          }
        },
        Af: function (a, b) {
          for (var c = 0; c < a; ++c) {
            var d = v[(b + 4 * c) >> 2],
              e = Vd[d];
            e && (L.deleteFramebuffer(e), (e.name = 0), (Vd[d] = null));
          }
        },
        zf: function (a) {
          if (a) {
            var b = N[a];
            b
              ? (L.deleteProgram(b),
                (b.name = 0),
                (N[a] = null),
                (ee[a] = null))
              : Y(1281);
          }
        },
        bd: function (a, b) {
          for (var c = 0; c < a; c++) {
            var d = v[(b + 4 * c) >> 2],
              e = ae[d];
            e && (L.deleteQuery(e), (ae[d] = null));
          }
        },
        tg: function (a, b) {
          for (var c = 0; c < a; c++) {
            var d = v[(b + 4 * c) >> 2],
              e = $d[d];
            e && (L.Ek.deleteQueryEXT(e), ($d[d] = null));
          }
        },
        yf: function (a, b) {
          for (var c = 0; c < a; c++) {
            var d = v[(b + 4 * c) >> 2],
              e = Wd[d];
            e && (L.deleteRenderbuffer(e), (e.name = 0), (Wd[d] = null));
          }
        },
        Jb: function (a, b) {
          for (var c = 0; c < a; c++) {
            var d = v[(b + 4 * c) >> 2],
              e = be[d];
            e && (L.deleteSampler(e), (e.name = 0), (be[d] = null));
          }
        },
        xf: function (a) {
          if (a) {
            var b = Yd[a];
            b ? (L.deleteShader(b), (Yd[a] = null)) : Y(1281);
          }
        },
        Rb: function (a) {
          if (a) {
            var b = de[a];
            b ? (L.deleteSync(b), (b.name = 0), (de[a] = null)) : Y(1281);
          }
        },
        wf: function (a, b) {
          for (var c = 0; c < a; c++) {
            var d = v[(b + 4 * c) >> 2],
              e = Xd[d];
            e && (L.deleteTexture(e), (e.name = 0), (Xd[d] = null));
          }
        },
        wb: function (a, b) {
          for (var c = 0; c < a; c++) {
            var d = v[(b + 4 * c) >> 2],
              e = ce[d];
            e && (L.deleteTransformFeedback(e), (e.name = 0), (ce[d] = null));
          }
        },
        Lc: function (a, b) {
          for (var c = 0; c < a; c++) {
            var d = v[(b + 4 * c) >> 2];
            L.deleteVertexArray(Zd[d]);
            Zd[d] = null;
          }
        },
        ig: function (a, b) {
          for (var c = 0; c < a; c++) {
            var d = v[(b + 4 * c) >> 2];
            L.deleteVertexArray(Zd[d]);
            Zd[d] = null;
          }
        },
        vf: function (a) {
          L.depthFunc(a);
        },
        uf: function (a) {
          L.depthMask(!!a);
        },
        tf: function (a, b) {
          L.depthRange(a, b);
        },
        sf: function (a, b) {
          L.detachShader(N[a], Yd[b]);
        },
        rf: function (a) {
          L.disable(a);
        },
        qf: function (a) {
          L.disableVertexAttribArray(a);
        },
        pf: function (a, b, c) {
          L.drawArrays(a, b, c);
        },
        Wb: function (a, b, c, d) {
          L.drawArraysInstanced(a, b, c, d);
        },
        eg: function (a, b, c, d) {
          L.drawArraysInstanced(a, b, c, d);
        },
        fb: function (a, b, c, d) {
          L.drawArraysInstanced(a, b, c, d);
        },
        nd: function (a, b, c, d) {
          L.drawArraysInstanced(a, b, c, d);
        },
        gb: function (a, b, c, d) {
          L.drawArraysInstanced(a, b, c, d);
        },
        Xc: function (a, b) {
          for (var c = qe[a], d = 0; d < a; d++) c[d] = v[(b + 4 * d) >> 2];
          L.drawBuffers(c);
        },
        ld: function (a, b) {
          for (var c = qe[a], d = 0; d < a; d++) c[d] = v[(b + 4 * d) >> 2];
          L.drawBuffers(c);
        },
        fg: function (a, b) {
          for (var c = qe[a], d = 0; d < a; d++) c[d] = v[(b + 4 * d) >> 2];
          L.drawBuffers(c);
        },
        of: function (a, b, c, d) {
          L.drawElements(a, b, c, d);
        },
        Vb: function (a, b, c, d, e) {
          L.drawElementsInstanced(a, b, c, d, e);
        },
        dg: function (a, b, c, d, e) {
          L.drawElementsInstanced(a, b, c, d, e);
        },
        db: function (a, b, c, d, e) {
          L.drawElementsInstanced(a, b, c, d, e);
        },
        eb: function (a, b, c, d, e) {
          L.drawElementsInstanced(a, b, c, d, e);
        },
        md: function (a, b, c, d, e) {
          L.drawElementsInstanced(a, b, c, d, e);
        },
        jd: function (a, b, c, d, e, h) {
          re(a, d, e, h);
        },
        nf: function (a) {
          L.enable(a);
        },
        lf: function (a) {
          L.enableVertexAttribArray(a);
        },
        _c: function (a) {
          L.endQuery(a);
        },
        qg: function (a) {
          L.Ek.endQueryEXT(a);
        },
        Fc: function () {
          L.endTransformFeedback();
        },
        Ub: function (a, b) {
          return (a = L.fenceSync(a, b))
            ? ((b = ie(de)), (a.name = b), (de[b] = a), b)
            : 0;
        },
        kf: function () {
          L.finish();
        },
        jf: function () {
          L.flush();
        },
        hf: function (a, b, c, d) {
          L.framebufferRenderbuffer(a, b, c, Wd[d]);
        },
        gf: function (a, b, c, d, e) {
          L.framebufferTexture2D(a, b, c, Xd[d], e);
        },
        Nc: function (a, b, c, d, e) {
          L.framebufferTextureLayer(a, b, Xd[c], d, e);
        },
        ff: function (a) {
          L.frontFace(a);
        },
        ef: function (a, b) {
          se(a, b, "createBuffer", Ud);
        },
        cf: function (a, b) {
          se(a, b, "createFramebuffer", Vd);
        },
        cd: function (a, b) {
          se(a, b, "createQuery", ae);
        },
        ug: function (a, b) {
          for (var c = 0; c < a; c++) {
            var d = L.Ek.createQueryEXT();
            if (!d) {
              for (Y(1282); c < a; ) v[(b + 4 * c++) >> 2] = 0;
              break;
            }
            var e = ie($d);
            d.name = e;
            $d[e] = d;
            v[(b + 4 * c) >> 2] = e;
          }
        },
        bf: function (a, b) {
          se(a, b, "createRenderbuffer", Wd);
        },
        Kb: function (a, b) {
          se(a, b, "createSampler", be);
        },
        af: function (a, b) {
          se(a, b, "createTexture", Xd);
        },
        vb: function (a, b) {
          se(a, b, "createTransformFeedback", ce);
        },
        Kc: function (a, b) {
          se(a, b, "createVertexArray", Zd);
        },
        hg: function (a, b) {
          se(a, b, "createVertexArray", Zd);
        },
        df: function (a) {
          L.generateMipmap(a);
        },
        $e: function (a, b, c, d, e, h, n) {
          a = N[a];
          if ((a = L.getActiveAttrib(a, b)))
            (c = 0 < c && n ? fa(a.name, n, c) : 0),
              d && (v[d >> 2] = c),
              e && (v[e >> 2] = a.size),
              h && (v[h >> 2] = a.type);
        },
        _e: function (a, b, c, d, e, h, n) {
          a = N[a];
          if ((a = L.getActiveUniform(a, b)))
            (c = 0 < c && n ? fa(a.name, n, c) : 0),
              d && (v[d >> 2] = c),
              e && (v[e >> 2] = a.size),
              h && (v[h >> 2] = a.type);
        },
        Yb: function (a, b, c, d, e) {
          a = N[a];
          if ((a = L.getActiveUniformBlockName(a, b)))
            e && 0 < c
              ? ((c = fa(a, e, c)), d && (v[d >> 2] = c))
              : d && (v[d >> 2] = 0);
        },
        Zb: function (a, b, c, d) {
          if (d)
            switch (((a = N[a]), c)) {
              case 35393:
                a = L.getActiveUniformBlockName(a, b);
                v[d >> 2] = a.length + 1;
                break;
              default:
                if ((a = L.getActiveUniformBlockParameter(a, b, c)))
                  if ("number" == typeof a) v[d >> 2] = a;
                  else
                    for (b = 0; b < a.length; b++) v[(d + 4 * b) >> 2] = a[b];
            }
          else Y(1281);
        },
        $b: function (a, b, c, d, e) {
          if (e)
            if (0 < b && 0 == c) Y(1281);
            else {
              a = N[a];
              for (var h = [], n = 0; n < b; n++) h.push(v[(c + 4 * n) >> 2]);
              if ((a = L.getActiveUniforms(a, h, d)))
                for (b = a.length, n = 0; n < b; n++)
                  v[(e + 4 * n) >> 2] = a[n];
            }
          else Y(1281);
        },
        Ze: function (a, b, c, d) {
          a = L.getAttachedShaders(N[a]);
          var e = a.length;
          e > b && (e = b);
          v[c >> 2] = e;
          for (b = 0; b < e; ++b) v[(d + 4 * b) >> 2] = Yd.indexOf(a[b]);
        },
        Ye: function (a, b) {
          return L.getAttribLocation(N[a], Qa(b));
        },
        Xe: function (a, b) {
          ue(a, b, 4);
        },
        Lb: function (a, b, c) {
          c ? te(c, L.getBufferParameter(a, b)) : Y(1281);
        },
        We: function (a, b, c) {
          c ? (v[c >> 2] = L.getBufferParameter(a, b)) : Y(1281);
        },
        Ve: function () {
          var a = L.getError() || Td;
          Td = 0;
          return a;
        },
        Ue: function (a, b) {
          ue(a, b, 2);
        },
        rc: function (a, b) {
          return L.getFragDataLocation(N[a], Qa(b));
        },
        Te: function (a, b, c, d) {
          a = L.getFramebufferAttachmentParameter(a, b, c);
          if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture)
            a = a.name | 0;
          v[d >> 2] = a;
        },
        Mb: function (a, b, c) {
          ve(a, b, c, 1);
        },
        Ob: function (a, b) {
          ue(a, b, 1);
        },
        Hc: function (a, b, c) {
          ve(a, b, c, 0);
        },
        Se: function (a, b) {
          ue(a, b, 0);
        },
        jb: function (a, b, c, d, e) {
          if (0 > d) Y(1281);
          else if (e) {
            if (((a = L.getInternalformatParameter(a, b, c)), null !== a))
              for (b = 0; b < a.length && b < d; ++b) v[(e + b) >> 2] = a[b];
          } else Y(1281);
        },
        rb: function () {
          Y(1282);
        },
        Qe: function (a, b, c, d) {
          a = L.getProgramInfoLog(N[a]);
          null === a && (a = "(unknown error)");
          b = 0 < b && d ? fa(a, d, b) : 0;
          c && (v[c >> 2] = b);
        },
        Re: function (a, b, c) {
          if (c)
            if (a >= Sd) Y(1281);
            else {
              var d = ee[a];
              if (d)
                if (35716 == b)
                  (a = L.getProgramInfoLog(N[a])),
                    null === a && (a = "(unknown error)"),
                    (v[c >> 2] = a.length + 1);
                else if (35719 == b) v[c >> 2] = d.Al;
                else if (35722 == b) {
                  if (-1 == d.Jk) {
                    a = N[a];
                    var e = L.getProgramParameter(a, 35721);
                    for (b = d.Jk = 0; b < e; ++b)
                      d.Jk = Math.max(
                        d.Jk,
                        L.getActiveAttrib(a, b).name.length + 1
                      );
                  }
                  v[c >> 2] = d.Jk;
                } else if (35381 == b) {
                  if (-1 == d.Kk)
                    for (
                      a = N[a],
                        e = L.getProgramParameter(a, 35382),
                        b = d.Kk = 0;
                      b < e;
                      ++b
                    )
                      d.Kk = Math.max(
                        d.Kk,
                        L.getActiveUniformBlockName(a, b).length + 1
                      );
                  v[c >> 2] = d.Kk;
                } else v[c >> 2] = L.getProgramParameter(N[a], b);
              else Y(1282);
            }
          else Y(1281);
        },
        lg: function (a, b, c) {
          if (c) {
            a = L.Ek.getQueryObjectEXT($d[a], b);
            var d;
            "boolean" == typeof a ? (d = a ? 1 : 0) : (d = a);
            te(c, d);
          } else Y(1281);
        },
        ng: function (a, b, c) {
          if (c) {
            a = L.Ek.getQueryObjectEXT($d[a], b);
            var d;
            "boolean" == typeof a ? (d = a ? 1 : 0) : (d = a);
            v[c >> 2] = d;
          } else Y(1281);
        },
        kg: function (a, b, c) {
          if (c) {
            a = L.Ek.getQueryObjectEXT($d[a], b);
            var d;
            "boolean" == typeof a ? (d = a ? 1 : 0) : (d = a);
            te(c, d);
          } else Y(1281);
        },
        Yc: function (a, b, c) {
          if (c) {
            a = L.getQueryParameter(ae[a], b);
            var d;
            "boolean" == typeof a ? (d = a ? 1 : 0) : (d = a);
            v[c >> 2] = d;
          } else Y(1281);
        },
        mg: function (a, b, c) {
          if (c) {
            a = L.Ek.getQueryObjectEXT($d[a], b);
            var d;
            "boolean" == typeof a ? (d = a ? 1 : 0) : (d = a);
            v[c >> 2] = d;
          } else Y(1281);
        },
        Zc: function (a, b, c) {
          c ? (v[c >> 2] = L.getQuery(a, b)) : Y(1281);
        },
        og: function (a, b, c) {
          c ? (v[c >> 2] = L.Ek.getQueryEXT(a, b)) : Y(1281);
        },
        Pe: function (a, b, c) {
          c ? (v[c >> 2] = L.getRenderbufferParameter(a, b)) : Y(1281);
        },
        Ab: function (a, b, c) {
          c
            ? ((a = be[a]), (G[c >> 2] = L.getSamplerParameter(a, b)))
            : Y(1281);
        },
        Bb: function (a, b, c) {
          c
            ? ((a = be[a]), (v[c >> 2] = L.getSamplerParameter(a, b)))
            : Y(1281);
        },
        Ne: function (a, b, c, d) {
          a = L.getShaderInfoLog(Yd[a]);
          null === a && (a = "(unknown error)");
          b = 0 < b && d ? fa(a, d, b) : 0;
          c && (v[c >> 2] = b);
        },
        Me: function (a, b, c, d) {
          a = L.getShaderPrecisionFormat(a, b);
          v[c >> 2] = a.rangeMin;
          v[(c + 4) >> 2] = a.rangeMax;
          v[d >> 2] = a.precision;
        },
        Le: function (a, b, c, d) {
          if ((a = L.getShaderSource(Yd[a])))
            (b = 0 < b && d ? fa(a, d, b) : 0), c && (v[c >> 2] = b);
        },
        Oe: function (a, b, c) {
          c
            ? 35716 == b
              ? ((a = L.getShaderInfoLog(Yd[a])),
                null === a && (a = "(unknown error)"),
                (v[c >> 2] = a.length + 1))
              : 35720 == b
              ? ((a = L.getShaderSource(Yd[a])),
                (v[c >> 2] = null === a || 0 == a.length ? 0 : a.length + 1))
              : (v[c >> 2] = L.getShaderParameter(Yd[a], b))
            : Y(1281);
        },
        Ke: function (a) {
          if (fe[a]) return fe[a];
          switch (a) {
            case 7939:
              var b = L.getSupportedExtensions() || [];
              b = b.concat(
                b.map(function (d) {
                  return "GL_" + d;
                })
              );
              b = we(b.join(" "));
              break;
            case 7936:
            case 7937:
            case 37445:
            case 37446:
              (b = L.getParameter(a)) || Y(1280);
              b = we(b);
              break;
            case 7938:
              b = L.getParameter(7938);
              b =
                2 <= U.version
                  ? "OpenGL ES 3.0 (" + b + ")"
                  : "OpenGL ES 2.0 (" + b + ")";
              b = we(b);
              break;
            case 35724:
              b = L.getParameter(35724);
              var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
              null !== c &&
                (3 == c[1].length && (c[1] += "0"),
                (b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")"));
              b = we(b);
              break;
            default:
              return Y(1280), 0;
          }
          return (fe[a] = b);
        },
        dc: function (a, b) {
          if (2 > U.version) return Y(1282), 0;
          var c = ge[a];
          if (c) return 0 > b || b >= c.length ? (Y(1281), 0) : c[b];
          switch (a) {
            case 7939:
              return (
                (c = L.getSupportedExtensions() || []),
                (c = c.concat(
                  c.map(function (d) {
                    return "GL_" + d;
                  })
                )),
                (c = c.map(function (d) {
                  return we(d);
                })),
                (c = ge[a] = c),
                0 > b || b >= c.length ? (Y(1281), 0) : c[b]
              );
            default:
              return Y(1280), 0;
          }
        },
        Nb: function (a, b, c, d, e) {
          0 > c
            ? Y(1281)
            : e
            ? ((a = L.getSyncParameter(de[a], b)),
              (v[d >> 2] = a),
              null !== a && d && (v[d >> 2] = 1))
            : Y(1281);
        },
        Je: function (a, b, c) {
          c ? (G[c >> 2] = L.getTexParameter(a, b)) : Y(1281);
        },
        He: function (a, b, c) {
          c ? (v[c >> 2] = L.getTexParameter(a, b)) : Y(1281);
        },
        Bc: function (a, b, c, d, e, h, n) {
          a = N[a];
          if ((a = L.getTransformFeedbackVarying(a, b)))
            n && 0 < c
              ? ((c = fa(a.name, n, c)), d && (v[d >> 2] = c))
              : d && (v[d >> 2] = 0),
              e && (v[e >> 2] = a.size),
              h && (v[h >> 2] = a.type);
        },
        _b: function (a, b) {
          return L.getUniformBlockIndex(N[a], Qa(b));
        },
        ac: function (a, b, c, d) {
          if (d)
            if (0 < b && (0 == c || 0 == d)) Y(1281);
            else {
              a = N[a];
              for (var e = [], h = 0; h < b; h++)
                e.push(Qa(v[(c + 4 * h) >> 2]));
              if ((a = L.getUniformIndices(a, e)))
                for (b = a.length, h = 0; h < b; h++)
                  v[(d + 4 * h) >> 2] = a[h];
            }
          else Y(1281);
        },
        Ee: function (a, b) {
          b = Qa(b);
          var c = 0;
          if ("]" == b[b.length - 1]) {
            var d = b.lastIndexOf("[");
            c = "]" != b[d + 1] ? parseInt(b.slice(d + 1)) : 0;
            b = b.slice(0, d);
          }
          return (a = ee[a] && ee[a].Sl[b]) && 0 <= c && c < a[0]
            ? a[1] + c
            : -1;
        },
        Ge: function (a, b, c) {
          xe(a, b, c, 2);
        },
        Fe: function (a, b, c) {
          xe(a, b, c, 0);
        },
        sc: function (a, b, c) {
          xe(a, b, c, 0);
        },
        zc: function (a, b, c) {
          ye(a, b, c, 0);
        },
        xc: function (a, b, c) {
          ye(a, b, c, 0);
        },
        Be: function (a, b, c) {
          c ? (v[c >> 2] = L.getVertexAttribOffset(a, b)) : Y(1281);
        },
        De: function (a, b, c) {
          ye(a, b, c, 2);
        },
        Ce: function (a, b, c) {
          ye(a, b, c, 5);
        },
        Ae: function (a, b) {
          L.hint(a, b);
        },
        ob: function (a, b, c) {
          for (var d = qe[b], e = 0; e < b; e++) d[e] = v[(c + 4 * e) >> 2];
          L.invalidateFramebuffer(a, d);
        },
        nb: function (a, b, c, d, e, h, n) {
          for (var q = qe[b], u = 0; u < b; u++) q[u] = v[(c + 4 * u) >> 2];
          L.invalidateSubFramebuffer(a, q, d, e, h, n);
        },
        ze: function (a) {
          return (a = Ud[a]) ? L.isBuffer(a) : 0;
        },
        ye: function (a) {
          return L.isEnabled(a);
        },
        we: function (a) {
          return (a = Vd[a]) ? L.isFramebuffer(a) : 0;
        },
        ve: function (a) {
          return (a = N[a]) ? L.isProgram(a) : 0;
        },
        ad: function (a) {
          return (a = ae[a]) ? L.isQuery(a) : 0;
        },
        sg: function (a) {
          return (a = $d[a]) ? L.Ek.isQueryEXT(a) : 0;
        },
        ue: function (a) {
          return (a = Wd[a]) ? L.isRenderbuffer(a) : 0;
        },
        Hb: function (a) {
          return (a = be[a]) ? L.isSampler(a) : 0;
        },
        te: function (a) {
          return (a = Yd[a]) ? L.isShader(a) : 0;
        },
        Sb: function (a) {
          return L.isSync(de[a]);
        },
        se: function (a) {
          return (a = Xd[a]) ? L.isTexture(a) : 0;
        },
        ub: function (a) {
          return L.isTransformFeedback(ce[a]);
        },
        Ic: function (a) {
          return (a = Zd[a]) ? L.isVertexArray(a) : 0;
        },
        gg: function (a) {
          return (a = Zd[a]) ? L.isVertexArray(a) : 0;
        },
        re: function (a) {
          L.lineWidth(a);
        },
        qe: function (a) {
          L.linkProgram(N[a]);
          ne(a);
        },
        tb: function () {
          L.pauseTransformFeedback();
        },
        pe: function (a, b) {
          3317 == a && (he = b);
          L.pixelStorei(a, b);
        },
        oe: function (a, b) {
          L.polygonOffset(a, b);
        },
        qb: function () {
          Y(1280);
        },
        pb: function () {
          Y(1280);
        },
        pg: function (a, b) {
          L.Ek.queryCounterEXT($d[a], b);
        },
        kd: function (a) {
          L.readBuffer(a);
        },
        ne: function (a, b, c, d, e, h, n) {
          if (2 <= U.version)
            if (L.Sk) L.readPixels(a, b, c, d, e, h, n);
            else {
              var q = ze(h);
              L.readPixels(a, b, c, d, e, h, q, n >> Ae(q));
            }
          else
            (n = Be(h, e, c, d, n))
              ? L.readPixels(a, b, c, d, e, h, n)
              : Y(1280);
        },
        me: function () {},
        le: function (a, b, c, d) {
          L.renderbufferStorage(a, b, c, d);
        },
        Oc: function (a, b, c, d, e) {
          L.renderbufferStorageMultisample(a, b, c, d, e);
        },
        sb: function () {
          L.resumeTransformFeedback();
        },
        ke: function (a, b) {
          L.sampleCoverage(a, !!b);
        },
        Db: function (a, b, c) {
          L.samplerParameterf(be[a], b, c);
        },
        Cb: function (a, b, c) {
          L.samplerParameterf(be[a], b, G[c >> 2]);
        },
        Fb: function (a, b, c) {
          L.samplerParameteri(be[a], b, c);
        },
        Eb: function (a, b, c) {
          L.samplerParameteri(be[a], b, v[c >> 2]);
        },
        je: function (a, b, c, d) {
          L.scissor(a, b, c, d);
        },
        ie: function () {
          Y(1280);
        },
        he: function (a, b, c, d) {
          b = le(b, c, d);
          L.shaderSource(Yd[a], b);
        },
        ge: function (a, b, c) {
          L.stencilFunc(a, b, c);
        },
        fe: function (a, b, c, d) {
          L.stencilFuncSeparate(a, b, c, d);
        },
        ee: function (a) {
          L.stencilMask(a);
        },
        de: function (a, b) {
          L.stencilMaskSeparate(a, b);
        },
        ce: function (a, b, c) {
          L.stencilOp(a, b, c);
        },
        be: function (a, b, c, d) {
          L.stencilOpSeparate(a, b, c, d);
        },
        ae: function (a, b, c, d, e, h, n, q, u) {
          if (2 <= U.version)
            if (L.vk) L.texImage2D(a, b, c, d, e, h, n, q, u);
            else if (u) {
              var A = ze(q);
              L.texImage2D(a, b, c, d, e, h, n, q, A, u >> Ae(A));
            } else L.texImage2D(a, b, c, d, e, h, n, q, null);
          else
            L.texImage2D(a, b, c, d, e, h, n, q, u ? Be(q, n, d, e, u) : null);
        },
        id: function (a, b, c, d, e, h, n, q, u, A) {
          if (L.vk) L.texImage3D(a, b, c, d, e, h, n, q, u, A);
          else if (A) {
            var C = ze(u);
            L.texImage3D(a, b, c, d, e, h, n, q, u, C, A >> Ae(C));
          } else L.texImage3D(a, b, c, d, e, h, n, q, u, null);
        },
        $d: function (a, b, c) {
          L.texParameterf(a, b, c);
        },
        _d: function (a, b, c) {
          L.texParameterf(a, b, G[c >> 2]);
        },
        Zd: function (a, b, c) {
          L.texParameteri(a, b, c);
        },
        Yd: function (a, b, c) {
          L.texParameteri(a, b, v[c >> 2]);
        },
        lb: function (a, b, c, d, e) {
          L.texStorage2D(a, b, c, d, e);
        },
        kb: function (a, b, c, d, e, h) {
          L.texStorage3D(a, b, c, d, e, h);
        },
        Xd: function (a, b, c, d, e, h, n, q, u) {
          if (2 <= U.version)
            if (L.vk) L.texSubImage2D(a, b, c, d, e, h, n, q, u);
            else if (u) {
              var A = ze(q);
              L.texSubImage2D(a, b, c, d, e, h, n, q, A, u >> Ae(A));
            } else L.texSubImage2D(a, b, c, d, e, h, n, q, null);
          else
            (A = null),
              u && (A = Be(q, n, e, h, u)),
              L.texSubImage2D(a, b, c, d, e, h, n, q, A);
        },
        hd: function (a, b, c, d, e, h, n, q, u, A, C) {
          if (L.vk) L.texSubImage3D(a, b, c, d, e, h, n, q, u, A, C);
          else if (C) {
            var M = ze(A);
            L.texSubImage3D(a, b, c, d, e, h, n, q, u, A, M, C >> Ae(M));
          } else L.texSubImage3D(a, b, c, d, e, h, n, q, u, A, null);
        },
        Cc: function (a, b, c, d) {
          a = N[a];
          for (var e = [], h = 0; h < b; h++) e.push(Qa(v[(c + 4 * h) >> 2]));
          L.transformFeedbackVaryings(a, e, d);
        },
        Wd: function (a, b) {
          L.uniform1f(R[a], b);
        },
        Vd: function (a, b, c) {
          if (2 <= U.version) L.uniform1fv(R[a], G, c >> 2, b);
          else {
            if (256 >= b)
              for (var d = je[b - 1], e = 0; e < b; ++e)
                d[e] = G[(c + 4 * e) >> 2];
            else d = G.subarray(c >> 2, (c + 4 * b) >> 2);
            L.uniform1fv(R[a], d);
          }
        },
        Td: function (a, b) {
          L.uniform1i(R[a], b);
        },
        Sd: function (a, b, c) {
          if (2 <= U.version) L.uniform1iv(R[a], v, c >> 2, b);
          else {
            if (256 >= b)
              for (var d = ke[b - 1], e = 0; e < b; ++e)
                d[e] = v[(c + 4 * e) >> 2];
            else d = v.subarray(c >> 2, (c + 4 * b) >> 2);
            L.uniform1iv(R[a], d);
          }
        },
        qc: function (a, b) {
          L.uniform1ui(R[a], b);
        },
        lc: function (a, b, c) {
          L.uniform1uiv(R[a], fb, c >> 2, b);
        },
        Rd: function (a, b, c) {
          L.uniform2f(R[a], b, c);
        },
        Qd: function (a, b, c) {
          if (2 <= U.version) L.uniform2fv(R[a], G, c >> 2, 2 * b);
          else {
            if (256 >= 2 * b)
              for (var d = je[2 * b - 1], e = 0; e < 2 * b; e += 2)
                (d[e] = G[(c + 4 * e) >> 2]),
                  (d[e + 1] = G[(c + (4 * e + 4)) >> 2]);
            else d = G.subarray(c >> 2, (c + 8 * b) >> 2);
            L.uniform2fv(R[a], d);
          }
        },
        Pd: function (a, b, c) {
          L.uniform2i(R[a], b, c);
        },
        Od: function (a, b, c) {
          if (2 <= U.version) L.uniform2iv(R[a], v, c >> 2, 2 * b);
          else {
            if (256 >= 2 * b)
              for (var d = ke[2 * b - 1], e = 0; e < 2 * b; e += 2)
                (d[e] = v[(c + 4 * e) >> 2]),
                  (d[e + 1] = v[(c + (4 * e + 4)) >> 2]);
            else d = v.subarray(c >> 2, (c + 8 * b) >> 2);
            L.uniform2iv(R[a], d);
          }
        },
        pc: function (a, b, c) {
          L.uniform2ui(R[a], b, c);
        },
        kc: function (a, b, c) {
          L.uniform2uiv(R[a], fb, c >> 2, 2 * b);
        },
        Nd: function (a, b, c, d) {
          L.uniform3f(R[a], b, c, d);
        },
        Md: function (a, b, c) {
          if (2 <= U.version) L.uniform3fv(R[a], G, c >> 2, 3 * b);
          else {
            if (256 >= 3 * b)
              for (var d = je[3 * b - 1], e = 0; e < 3 * b; e += 3)
                (d[e] = G[(c + 4 * e) >> 2]),
                  (d[e + 1] = G[(c + (4 * e + 4)) >> 2]),
                  (d[e + 2] = G[(c + (4 * e + 8)) >> 2]);
            else d = G.subarray(c >> 2, (c + 12 * b) >> 2);
            L.uniform3fv(R[a], d);
          }
        },
        Ld: function (a, b, c, d) {
          L.uniform3i(R[a], b, c, d);
        },
        Kd: function (a, b, c) {
          if (2 <= U.version) L.uniform3iv(R[a], v, c >> 2, 3 * b);
          else {
            if (256 >= 3 * b)
              for (var d = ke[3 * b - 1], e = 0; e < 3 * b; e += 3)
                (d[e] = v[(c + 4 * e) >> 2]),
                  (d[e + 1] = v[(c + (4 * e + 4)) >> 2]),
                  (d[e + 2] = v[(c + (4 * e + 8)) >> 2]);
            else d = v.subarray(c >> 2, (c + 12 * b) >> 2);
            L.uniform3iv(R[a], d);
          }
        },
        oc: function (a, b, c, d) {
          L.uniform3ui(R[a], b, c, d);
        },
        jc: function (a, b, c) {
          L.uniform3uiv(R[a], fb, c >> 2, 3 * b);
        },
        Jd: function (a, b, c, d, e) {
          L.uniform4f(R[a], b, c, d, e);
        },
        Id: function (a, b, c) {
          if (2 <= U.version) L.uniform4fv(R[a], G, c >> 2, 4 * b);
          else {
            if (256 >= 4 * b) {
              var d = je[4 * b - 1],
                e = G;
              c >>= 2;
              for (var h = 0; h < 4 * b; h += 4) {
                var n = c + h;
                d[h] = e[n];
                d[h + 1] = e[n + 1];
                d[h + 2] = e[n + 2];
                d[h + 3] = e[n + 3];
              }
            } else d = G.subarray(c >> 2, (c + 16 * b) >> 2);
            L.uniform4fv(R[a], d);
          }
        },
        Hd: function (a, b, c, d, e) {
          L.uniform4i(R[a], b, c, d, e);
        },
        Gd: function (a, b, c) {
          if (2 <= U.version) L.uniform4iv(R[a], v, c >> 2, 4 * b);
          else {
            if (256 >= 4 * b)
              for (var d = ke[4 * b - 1], e = 0; e < 4 * b; e += 4)
                (d[e] = v[(c + 4 * e) >> 2]),
                  (d[e + 1] = v[(c + (4 * e + 4)) >> 2]),
                  (d[e + 2] = v[(c + (4 * e + 8)) >> 2]),
                  (d[e + 3] = v[(c + (4 * e + 12)) >> 2]);
            else d = v.subarray(c >> 2, (c + 16 * b) >> 2);
            L.uniform4iv(R[a], d);
          }
        },
        mc: function (a, b, c, d, e) {
          L.uniform4ui(R[a], b, c, d, e);
        },
        ic: function (a, b, c) {
          L.uniform4uiv(R[a], fb, c >> 2, 4 * b);
        },
        Xb: function (a, b, c) {
          a = N[a];
          L.uniformBlockBinding(a, b, c);
        },
        Fd: function (a, b, c, d) {
          if (2 <= U.version) L.uniformMatrix2fv(R[a], !!c, G, d >> 2, 4 * b);
          else {
            if (256 >= 4 * b)
              for (var e = je[4 * b - 1], h = 0; h < 4 * b; h += 4)
                (e[h] = G[(d + 4 * h) >> 2]),
                  (e[h + 1] = G[(d + (4 * h + 4)) >> 2]),
                  (e[h + 2] = G[(d + (4 * h + 8)) >> 2]),
                  (e[h + 3] = G[(d + (4 * h + 12)) >> 2]);
            else e = G.subarray(d >> 2, (d + 16 * b) >> 2);
            L.uniformMatrix2fv(R[a], !!c, e);
          }
        },
        Wc: function (a, b, c, d) {
          L.uniformMatrix2x3fv(R[a], !!c, G, d >> 2, 6 * b);
        },
        Tc: function (a, b, c, d) {
          L.uniformMatrix2x4fv(R[a], !!c, G, d >> 2, 8 * b);
        },
        Ed: function (a, b, c, d) {
          if (2 <= U.version) L.uniformMatrix3fv(R[a], !!c, G, d >> 2, 9 * b);
          else {
            if (256 >= 9 * b)
              for (var e = je[9 * b - 1], h = 0; h < 9 * b; h += 9)
                (e[h] = G[(d + 4 * h) >> 2]),
                  (e[h + 1] = G[(d + (4 * h + 4)) >> 2]),
                  (e[h + 2] = G[(d + (4 * h + 8)) >> 2]),
                  (e[h + 3] = G[(d + (4 * h + 12)) >> 2]),
                  (e[h + 4] = G[(d + (4 * h + 16)) >> 2]),
                  (e[h + 5] = G[(d + (4 * h + 20)) >> 2]),
                  (e[h + 6] = G[(d + (4 * h + 24)) >> 2]),
                  (e[h + 7] = G[(d + (4 * h + 28)) >> 2]),
                  (e[h + 8] = G[(d + (4 * h + 32)) >> 2]);
            else e = G.subarray(d >> 2, (d + 36 * b) >> 2);
            L.uniformMatrix3fv(R[a], !!c, e);
          }
        },
        Vc: function (a, b, c, d) {
          L.uniformMatrix3x2fv(R[a], !!c, G, d >> 2, 6 * b);
        },
        Rc: function (a, b, c, d) {
          L.uniformMatrix3x4fv(R[a], !!c, G, d >> 2, 12 * b);
        },
        Dd: function (a, b, c, d) {
          if (2 <= U.version) L.uniformMatrix4fv(R[a], !!c, G, d >> 2, 16 * b);
          else {
            if (256 >= 16 * b) {
              var e = je[16 * b - 1],
                h = G;
              d >>= 2;
              for (var n = 0; n < 16 * b; n += 16) {
                var q = d + n;
                e[n] = h[q];
                e[n + 1] = h[q + 1];
                e[n + 2] = h[q + 2];
                e[n + 3] = h[q + 3];
                e[n + 4] = h[q + 4];
                e[n + 5] = h[q + 5];
                e[n + 6] = h[q + 6];
                e[n + 7] = h[q + 7];
                e[n + 8] = h[q + 8];
                e[n + 9] = h[q + 9];
                e[n + 10] = h[q + 10];
                e[n + 11] = h[q + 11];
                e[n + 12] = h[q + 12];
                e[n + 13] = h[q + 13];
                e[n + 14] = h[q + 14];
                e[n + 15] = h[q + 15];
              }
            } else e = G.subarray(d >> 2, (d + 64 * b) >> 2);
            L.uniformMatrix4fv(R[a], !!c, e);
          }
        },
        Sc: function (a, b, c, d) {
          L.uniformMatrix4x2fv(R[a], !!c, G, d >> 2, 8 * b);
        },
        Qc: function (a, b, c, d) {
          L.uniformMatrix4x3fv(R[a], !!c, G, d >> 2, 12 * b);
        },
        Cd: function (a) {
          L.useProgram(N[a]);
        },
        Bd: function (a) {
          L.validateProgram(N[a]);
        },
        Ad: function (a, b) {
          L.vertexAttrib1f(a, b);
        },
        yd: function (a, b) {
          L.vertexAttrib1f(a, G[b >> 2]);
        },
        xd: function (a, b, c) {
          L.vertexAttrib2f(a, b, c);
        },
        wd: function (a, b) {
          L.vertexAttrib2f(a, G[b >> 2], G[(b + 4) >> 2]);
        },
        vd: function (a, b, c, d) {
          L.vertexAttrib3f(a, b, c, d);
        },
        ud: function (a, b) {
          L.vertexAttrib3f(a, G[b >> 2], G[(b + 4) >> 2], G[(b + 8) >> 2]);
        },
        td: function (a, b, c, d, e) {
          L.vertexAttrib4f(a, b, c, d, e);
        },
        sd: function (a, b) {
          L.vertexAttrib4f(
            a,
            G[b >> 2],
            G[(b + 4) >> 2],
            G[(b + 8) >> 2],
            G[(b + 12) >> 2]
          );
        },
        zb: function (a, b) {
          L.vertexAttribDivisor(a, b);
        },
        cg: function (a, b) {
          L.vertexAttribDivisor(a, b);
        },
        hb: function (a, b) {
          L.vertexAttribDivisor(a, b);
        },
        pd: function (a, b) {
          L.vertexAttribDivisor(a, b);
        },
        ib: function (a, b) {
          L.vertexAttribDivisor(a, b);
        },
        wc: function (a, b, c, d, e) {
          L.vertexAttribI4i(a, b, c, d, e);
        },
        uc: function (a, b) {
          L.vertexAttribI4i(
            a,
            v[b >> 2],
            v[(b + 4) >> 2],
            v[(b + 8) >> 2],
            v[(b + 12) >> 2]
          );
        },
        vc: function (a, b, c, d, e) {
          L.vertexAttribI4ui(a, b, c, d, e);
        },
        tc: function (a, b) {
          L.vertexAttribI4ui(
            a,
            fb[b >> 2],
            fb[(b + 4) >> 2],
            fb[(b + 8) >> 2],
            fb[(b + 12) >> 2]
          );
        },
        Ac: function (a, b, c, d, e) {
          L.vertexAttribIPointer(a, b, c, d, e);
        },
        rd: function (a, b, c, d, e, h) {
          L.vertexAttribPointer(a, b, c, !!d, e, h);
        },
        qd: function (a, b, c, d) {
          L.viewport(a, b, c, d);
        },
        Pb: function (a, b, c, d) {
          L.waitSync(de[a], b, (c >>> 0) + 4294967296 * d);
        },
        f: function (a, b) {
          Ze(a, b || 1);
          throw "longjmp";
        },
        vg: function (a, b, c) {
          k.copyWithin(a, b, b + c);
        },
        wg: function (a) {
          a >>>= 0;
          var b = k.length;
          if (2147483648 < a) return !1;
          for (var c = 1; 4 >= c; c *= 2) {
            var d = b * (1 + 0.2 / c);
            d = Math.min(d, a + 100663296);
            d = Math.max(16777216, a, d);
            0 < d % 65536 && (d += 65536 - (d % 65536));
            a: {
              try {
                La.grow(
                  (Math.min(2147483648, d) - eb.byteLength + 65535) >>> 16
                );
                lb(La.buffer);
                var e = 1;
                break a;
              } catch (h) {}
              e = void 0;
            }
            if (e) return !0;
          }
          return !1;
        },
        ia: function () {
          return U ? U.sm : 0;
        },
        Z: function (a) {
          return Ed(a) ? 0 : -5;
        },
        Ag: function (a, b) {
          var c = 0;
          Ge().forEach(function (d, e) {
            var h = b + c;
            e = v[(a + 4 * e) >> 2] = h;
            for (h = 0; h < d.length; ++h) db[e++ >> 0] = d.charCodeAt(h);
            db[e >> 0] = 0;
            c += d.length + 1;
          });
          return 0;
        },
        Bg: function (a, b) {
          var c = Ge();
          v[a >> 2] = c.length;
          var d = 0;
          c.forEach(function (e) {
            d += e.length + 1;
          });
          v[b >> 2] = d;
          return 0;
        },
        dd: function (a) {
          if (!noExitRuntime && ((Na = !0), g.onExit)) g.onExit(a);
          ma(a, new Da(a));
        },
        J: function () {
          return 0;
        },
        zg: function (a, b) {
          a = 1 == a || 2 == a ? 2 : Ea();
          db[b >> 0] = a;
          return 0;
        },
        Dg: function (a, b, c, d) {
          a = Ib.en(a);
          b = Ib.cn(a, b, c);
          v[d >> 2] = b;
          return 0;
        },
        cb: function () {},
        O: function (a, b, c, d) {
          for (var e = 0, h = 0; h < c; h++) {
            for (
              var n = v[(b + 8 * h) >> 2], q = v[(b + (8 * h + 4)) >> 2], u = 0;
              u < q;
              u++
            ) {
              var A = k[n + u],
                C = Hb[a];
              0 === A || 10 === A
                ? ((1 === a ? Fa : Ga)(Pa(C, 0)), (C.length = 0))
                : C.push(A);
            }
            e += q;
          }
          v[d >> 2] = e;
          return 0;
        },
        a: function () {
          return Ja | 0;
        },
        yc: function (a) {
          L.activeTexture(a);
        },
        nc: function (a, b) {
          L.attachShader(N[a], Yd[b]);
        },
        cc: function (a, b, c) {
          L.bindAttribLocation(N[a], b, Qa(c));
        },
        Tb: function (a, b) {
          35051 == a ? (L.Sk = b) : 35052 == a && (L.vk = b);
          L.bindBuffer(a, Ud[b]);
        },
        Ib: function (a, b) {
          L.bindFramebuffer(a, Vd[b]);
        },
        xb: function (a, b) {
          L.bindRenderbuffer(a, Wd[b]);
        },
        mb: function (a, b) {
          L.bindTexture(a, Xd[b]);
        },
        bb: function (a, b, c, d) {
          L.blendColor(a, b, c, d);
        },
        ab: function (a) {
          L.blendEquation(a);
        },
        $a: function (a, b) {
          L.blendFunc(a, b);
        },
        _a: function (a, b, c, d) {
          2 <= U.version
            ? c
              ? L.bufferData(a, k, d, c, b)
              : L.bufferData(a, b, d)
            : L.bufferData(a, c ? k.subarray(c, c + b) : b, d);
        },
        Ya: function (a, b, c, d) {
          2 <= U.version
            ? L.bufferSubData(a, b, k, d, c)
            : L.bufferSubData(a, b, k.subarray(d, d + c));
        },
        Xa: function (a) {
          return L.checkFramebufferStatus(a);
        },
        M: function (a) {
          L.clear(a);
        },
        Y: function (a, b, c, d) {
          L.clearColor(a, b, c, d);
        },
        N: function (a) {
          L.clearStencil(a);
        },
        Wa: function (a, b, c, d) {
          L.colorMask(!!a, !!b, !!c, !!d);
        },
        Va: function (a) {
          L.compileShader(Yd[a]);
        },
        Ua: function (a, b, c, d, e, h, n, q) {
          2 <= U.version
            ? L.vk
              ? L.compressedTexImage2D(a, b, c, d, e, h, n, q)
              : L.compressedTexImage2D(a, b, c, d, e, h, k, q, n)
            : L.compressedTexImage2D(
                a,
                b,
                c,
                d,
                e,
                h,
                q ? k.subarray(q, q + n) : null
              );
        },
        Ta: function (a, b, c, d, e, h, n, q, u) {
          2 <= U.version
            ? L.vk
              ? L.compressedTexSubImage2D(a, b, c, d, e, h, n, q, u)
              : L.compressedTexSubImage2D(a, b, c, d, e, h, n, k, u, q)
            : L.compressedTexSubImage2D(
                a,
                b,
                c,
                d,
                e,
                h,
                n,
                u ? k.subarray(u, u + q) : null
              );
        },
        Sa: function (a, b, c, d, e, h, n, q) {
          L.copyTexSubImage2D(a, b, c, d, e, h, n, q);
        },
        Ra: function () {
          var a = ie(N),
            b = L.createProgram();
          b.name = a;
          N[a] = b;
          return a;
        },
        Qa: function (a) {
          var b = ie(Yd);
          Yd[b] = L.createShader(a);
          return b;
        },
        Pa: function (a) {
          L.cullFace(a);
        },
        Oa: function (a, b) {
          for (var c = 0; c < a; c++) {
            var d = v[(b + 4 * c) >> 2],
              e = Ud[d];
            e &&
              (L.deleteBuffer(e),
              (e.name = 0),
              (Ud[d] = null),
              d == oe && (oe = 0),
              d == pe && (pe = 0),
              d == L.Sk && (L.Sk = 0),
              d == L.vk && (L.vk = 0));
          }
        },
        Na: function (a, b) {
          for (var c = 0; c < a; ++c) {
            var d = v[(b + 4 * c) >> 2],
              e = Vd[d];
            e && (L.deleteFramebuffer(e), (e.name = 0), (Vd[d] = null));
          }
        },
        Ma: function (a) {
          if (a) {
            var b = N[a];
            b
              ? (L.deleteProgram(b),
                (b.name = 0),
                (N[a] = null),
                (ee[a] = null))
              : Y(1281);
          }
        },
        La: function (a, b) {
          for (var c = 0; c < a; c++) {
            var d = v[(b + 4 * c) >> 2],
              e = Wd[d];
            e && (L.deleteRenderbuffer(e), (e.name = 0), (Wd[d] = null));
          }
        },
        Ka: function (a) {
          if (a) {
            var b = Yd[a];
            b ? (L.deleteShader(b), (Yd[a] = null)) : Y(1281);
          }
        },
        Ja: function (a, b) {
          for (var c = 0; c < a; c++) {
            var d = v[(b + 4 * c) >> 2],
              e = Xd[d];
            e && (L.deleteTexture(e), (e.name = 0), (Xd[d] = null));
          }
        },
        Ia: function (a) {
          L.depthMask(!!a);
        },
        Ha: function (a) {
          L.disable(a);
        },
        Ga: function (a) {
          L.disableVertexAttribArray(a);
        },
        Fa: function (a, b, c) {
          L.drawArrays(a, b, c);
        },
        Da: re,
        Ca: function (a) {
          L.enable(a);
        },
        Ba: function (a) {
          L.enableVertexAttribArray(a);
        },
        Aa: function () {
          L.finish();
        },
        za: function () {
          L.flush();
        },
        ya: function (a, b, c, d) {
          L.framebufferRenderbuffer(a, b, c, Wd[d]);
        },
        xa: function (a, b, c, d, e) {
          L.framebufferTexture2D(a, b, c, Xd[d], e);
        },
        wa: function (a) {
          L.frontFace(a);
        },
        va: function (a, b) {
          se(a, b, "createBuffer", Ud);
        },
        ua: function (a, b) {
          se(a, b, "createFramebuffer", Vd);
        },
        sa: function (a, b) {
          se(a, b, "createRenderbuffer", Wd);
        },
        ra: function (a, b) {
          se(a, b, "createTexture", Xd);
        },
        qa: function (a) {
          L.generateMipmap(a);
        },
        pa: function (a, b, c) {
          c ? (v[c >> 2] = L.getBufferParameter(a, b)) : Y(1281);
        },
        oa: function () {
          var a = L.getError() || Td;
          Td = 0;
          return a;
        },
        na: function (a, b, c, d) {
          a = L.getFramebufferAttachmentParameter(a, b, c);
          if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture)
            a = a.name | 0;
          v[d >> 2] = a;
        },
        F: function (a, b) {
          ue(a, b, 0);
        },
        ma: function (a, b, c, d) {
          a = L.getProgramInfoLog(N[a]);
          null === a && (a = "(unknown error)");
          b = 0 < b && d ? fa(a, d, b) : 0;
          c && (v[c >> 2] = b);
        },
        la: function (a, b, c) {
          if (c)
            if (a >= Sd) Y(1281);
            else {
              var d = ee[a];
              if (d)
                if (35716 == b)
                  (a = L.getProgramInfoLog(N[a])),
                    null === a && (a = "(unknown error)"),
                    (v[c >> 2] = a.length + 1);
                else if (35719 == b) v[c >> 2] = d.Al;
                else if (35722 == b) {
                  if (-1 == d.Jk) {
                    a = N[a];
                    var e = L.getProgramParameter(a, 35721);
                    for (b = d.Jk = 0; b < e; ++b)
                      d.Jk = Math.max(
                        d.Jk,
                        L.getActiveAttrib(a, b).name.length + 1
                      );
                  }
                  v[c >> 2] = d.Jk;
                } else if (35381 == b) {
                  if (-1 == d.Kk)
                    for (
                      a = N[a],
                        e = L.getProgramParameter(a, 35382),
                        b = d.Kk = 0;
                      b < e;
                      ++b
                    )
                      d.Kk = Math.max(
                        d.Kk,
                        L.getActiveUniformBlockName(a, b).length + 1
                      );
                  v[c >> 2] = d.Kk;
                } else v[c >> 2] = L.getProgramParameter(N[a], b);
              else Y(1282);
            }
          else Y(1281);
        },
        ka: function (a, b, c) {
          c ? (v[c >> 2] = L.getRenderbufferParameter(a, b)) : Y(1281);
        },
        ja: function (a, b, c, d) {
          a = L.getShaderInfoLog(Yd[a]);
          null === a && (a = "(unknown error)");
          b = 0 < b && d ? fa(a, d, b) : 0;
          c && (v[c >> 2] = b);
        },
        ha: function (a, b, c, d) {
          a = L.getShaderPrecisionFormat(a, b);
          v[c >> 2] = a.rangeMin;
          v[(c + 4) >> 2] = a.rangeMax;
          v[d >> 2] = a.precision;
        },
        ga: function (a, b, c) {
          c
            ? 35716 == b
              ? ((a = L.getShaderInfoLog(Yd[a])),
                null === a && (a = "(unknown error)"),
                (v[c >> 2] = a.length + 1))
              : 35720 == b
              ? ((a = L.getShaderSource(Yd[a])),
                (v[c >> 2] = null === a || 0 == a.length ? 0 : a.length + 1))
              : (v[c >> 2] = L.getShaderParameter(Yd[a], b))
            : Y(1281);
        },
        fa: function (a) {
          if (fe[a]) return fe[a];
          switch (a) {
            case 7939:
              var b = L.getSupportedExtensions() || [];
              b = b.concat(
                b.map(function (d) {
                  return "GL_" + d;
                })
              );
              b = we(b.join(" "));
              break;
            case 7936:
            case 7937:
            case 37445:
            case 37446:
              (b = L.getParameter(a)) || Y(1280);
              b = we(b);
              break;
            case 7938:
              b = L.getParameter(7938);
              b =
                2 <= U.version
                  ? "OpenGL ES 3.0 (" + b + ")"
                  : "OpenGL ES 2.0 (" + b + ")";
              b = we(b);
              break;
            case 35724:
              b = L.getParameter(35724);
              var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
              null !== c &&
                (3 == c[1].length && (c[1] += "0"),
                (b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")"));
              b = we(b);
              break;
            default:
              return Y(1280), 0;
          }
          return (fe[a] = b);
        },
        ea: function (a, b) {
          b = Qa(b);
          var c = 0;
          if ("]" == b[b.length - 1]) {
            var d = b.lastIndexOf("[");
            c = "]" != b[d + 1] ? parseInt(b.slice(d + 1)) : 0;
            b = b.slice(0, d);
          }
          return (a = ee[a] && ee[a].Sl[b]) && 0 <= c && c < a[0]
            ? a[1] + c
            : -1;
        },
        da: function (a) {
          return (a = Xd[a]) ? L.isTexture(a) : 0;
        },
        ca: function (a) {
          L.lineWidth(a);
        },
        ba: function (a) {
          L.linkProgram(N[a]);
          ne(a);
        },
        aa: function (a, b) {
          3317 == a && (he = b);
          L.pixelStorei(a, b);
        },
        $: function (a, b, c, d, e, h, n) {
          if (2 <= U.version)
            if (L.Sk) L.readPixels(a, b, c, d, e, h, n);
            else {
              var q = ze(h);
              L.readPixels(a, b, c, d, e, h, q, n >> Ae(q));
            }
          else
            (n = Be(h, e, c, d, n))
              ? L.readPixels(a, b, c, d, e, h, n)
              : Y(1280);
        },
        _: function (a, b, c, d) {
          L.renderbufferStorage(a, b, c, d);
        },
        Ch: function (a, b, c, d) {
          L.scissor(a, b, c, d);
        },
        Bh: function (a, b, c, d) {
          b = le(b, c, d);
          L.shaderSource(Yd[a], b);
        },
        Ah: function (a, b, c) {
          L.stencilFunc(a, b, c);
        },
        zh: function (a, b, c, d) {
          L.stencilFuncSeparate(a, b, c, d);
        },
        yh: function (a) {
          L.stencilMask(a);
        },
        xh: function (a, b) {
          L.stencilMaskSeparate(a, b);
        },
        wh: function (a, b, c) {
          L.stencilOp(a, b, c);
        },
        vh: function (a, b, c, d) {
          L.stencilOpSeparate(a, b, c, d);
        },
        uh: function (a, b, c, d, e, h, n, q, u) {
          if (2 <= U.version)
            if (L.vk) L.texImage2D(a, b, c, d, e, h, n, q, u);
            else if (u) {
              var A = ze(q);
              L.texImage2D(a, b, c, d, e, h, n, q, A, u >> Ae(A));
            } else L.texImage2D(a, b, c, d, e, h, n, q, null);
          else
            L.texImage2D(a, b, c, d, e, h, n, q, u ? Be(q, n, d, e, u) : null);
        },
        th: function (a, b, c) {
          L.texParameterf(a, b, c);
        },
        sh: function (a, b, c) {
          L.texParameterf(a, b, G[c >> 2]);
        },
        rh: function (a, b, c) {
          L.texParameteri(a, b, c);
        },
        qh: function (a, b, c) {
          L.texParameteri(a, b, v[c >> 2]);
        },
        ph: function (a, b, c, d, e, h, n, q, u) {
          if (2 <= U.version)
            if (L.vk) L.texSubImage2D(a, b, c, d, e, h, n, q, u);
            else if (u) {
              var A = ze(q);
              L.texSubImage2D(a, b, c, d, e, h, n, q, A, u >> Ae(A));
            } else L.texSubImage2D(a, b, c, d, e, h, n, q, null);
          else
            (A = null),
              u && (A = Be(q, n, e, h, u)),
              L.texSubImage2D(a, b, c, d, e, h, n, q, A);
        },
        oh: function (a, b) {
          L.uniform1f(R[a], b);
        },
        nh: function (a, b, c) {
          if (2 <= U.version) L.uniform1fv(R[a], G, c >> 2, b);
          else {
            if (256 >= b)
              for (var d = je[b - 1], e = 0; e < b; ++e)
                d[e] = G[(c + 4 * e) >> 2];
            else d = G.subarray(c >> 2, (c + 4 * b) >> 2);
            L.uniform1fv(R[a], d);
          }
        },
        mh: function (a, b) {
          L.uniform1i(R[a], b);
        },
        lh: function (a, b, c) {
          if (2 <= U.version) L.uniform1iv(R[a], v, c >> 2, b);
          else {
            if (256 >= b)
              for (var d = ke[b - 1], e = 0; e < b; ++e)
                d[e] = v[(c + 4 * e) >> 2];
            else d = v.subarray(c >> 2, (c + 4 * b) >> 2);
            L.uniform1iv(R[a], d);
          }
        },
        kh: function (a, b, c) {
          L.uniform2f(R[a], b, c);
        },
        jh: function (a, b, c) {
          if (2 <= U.version) L.uniform2fv(R[a], G, c >> 2, 2 * b);
          else {
            if (256 >= 2 * b)
              for (var d = je[2 * b - 1], e = 0; e < 2 * b; e += 2)
                (d[e] = G[(c + 4 * e) >> 2]),
                  (d[e + 1] = G[(c + (4 * e + 4)) >> 2]);
            else d = G.subarray(c >> 2, (c + 8 * b) >> 2);
            L.uniform2fv(R[a], d);
          }
        },
        ih: function (a, b, c) {
          L.uniform2i(R[a], b, c);
        },
        hh: function (a, b, c) {
          if (2 <= U.version) L.uniform2iv(R[a], v, c >> 2, 2 * b);
          else {
            if (256 >= 2 * b)
              for (var d = ke[2 * b - 1], e = 0; e < 2 * b; e += 2)
                (d[e] = v[(c + 4 * e) >> 2]),
                  (d[e + 1] = v[(c + (4 * e + 4)) >> 2]);
            else d = v.subarray(c >> 2, (c + 8 * b) >> 2);
            L.uniform2iv(R[a], d);
          }
        },
        gh: function (a, b, c, d) {
          L.uniform3f(R[a], b, c, d);
        },
        fh: function (a, b, c) {
          if (2 <= U.version) L.uniform3fv(R[a], G, c >> 2, 3 * b);
          else {
            if (256 >= 3 * b)
              for (var d = je[3 * b - 1], e = 0; e < 3 * b; e += 3)
                (d[e] = G[(c + 4 * e) >> 2]),
                  (d[e + 1] = G[(c + (4 * e + 4)) >> 2]),
                  (d[e + 2] = G[(c + (4 * e + 8)) >> 2]);
            else d = G.subarray(c >> 2, (c + 12 * b) >> 2);
            L.uniform3fv(R[a], d);
          }
        },
        eh: function (a, b, c, d) {
          L.uniform3i(R[a], b, c, d);
        },
        dh: function (a, b, c) {
          if (2 <= U.version) L.uniform3iv(R[a], v, c >> 2, 3 * b);
          else {
            if (256 >= 3 * b)
              for (var d = ke[3 * b - 1], e = 0; e < 3 * b; e += 3)
                (d[e] = v[(c + 4 * e) >> 2]),
                  (d[e + 1] = v[(c + (4 * e + 4)) >> 2]),
                  (d[e + 2] = v[(c + (4 * e + 8)) >> 2]);
            else d = v.subarray(c >> 2, (c + 12 * b) >> 2);
            L.uniform3iv(R[a], d);
          }
        },
        ch: function (a, b, c, d, e) {
          L.uniform4f(R[a], b, c, d, e);
        },
        bh: function (a, b, c) {
          if (2 <= U.version) L.uniform4fv(R[a], G, c >> 2, 4 * b);
          else {
            if (256 >= 4 * b) {
              var d = je[4 * b - 1],
                e = G;
              c >>= 2;
              for (var h = 0; h < 4 * b; h += 4) {
                var n = c + h;
                d[h] = e[n];
                d[h + 1] = e[n + 1];
                d[h + 2] = e[n + 2];
                d[h + 3] = e[n + 3];
              }
            } else d = G.subarray(c >> 2, (c + 16 * b) >> 2);
            L.uniform4fv(R[a], d);
          }
        },
        ah: function (a, b, c, d, e) {
          L.uniform4i(R[a], b, c, d, e);
        },
        $g: function (a, b, c) {
          if (2 <= U.version) L.uniform4iv(R[a], v, c >> 2, 4 * b);
          else {
            if (256 >= 4 * b)
              for (var d = ke[4 * b - 1], e = 0; e < 4 * b; e += 4)
                (d[e] = v[(c + 4 * e) >> 2]),
                  (d[e + 1] = v[(c + (4 * e + 4)) >> 2]),
                  (d[e + 2] = v[(c + (4 * e + 8)) >> 2]),
                  (d[e + 3] = v[(c + (4 * e + 12)) >> 2]);
            else d = v.subarray(c >> 2, (c + 16 * b) >> 2);
            L.uniform4iv(R[a], d);
          }
        },
        _g: function (a, b, c, d) {
          if (2 <= U.version) L.uniformMatrix2fv(R[a], !!c, G, d >> 2, 4 * b);
          else {
            if (256 >= 4 * b)
              for (var e = je[4 * b - 1], h = 0; h < 4 * b; h += 4)
                (e[h] = G[(d + 4 * h) >> 2]),
                  (e[h + 1] = G[(d + (4 * h + 4)) >> 2]),
                  (e[h + 2] = G[(d + (4 * h + 8)) >> 2]),
                  (e[h + 3] = G[(d + (4 * h + 12)) >> 2]);
            else e = G.subarray(d >> 2, (d + 16 * b) >> 2);
            L.uniformMatrix2fv(R[a], !!c, e);
          }
        },
        Zg: function (a, b, c, d) {
          if (2 <= U.version) L.uniformMatrix3fv(R[a], !!c, G, d >> 2, 9 * b);
          else {
            if (256 >= 9 * b)
              for (var e = je[9 * b - 1], h = 0; h < 9 * b; h += 9)
                (e[h] = G[(d + 4 * h) >> 2]),
                  (e[h + 1] = G[(d + (4 * h + 4)) >> 2]),
                  (e[h + 2] = G[(d + (4 * h + 8)) >> 2]),
                  (e[h + 3] = G[(d + (4 * h + 12)) >> 2]),
                  (e[h + 4] = G[(d + (4 * h + 16)) >> 2]),
                  (e[h + 5] = G[(d + (4 * h + 20)) >> 2]),
                  (e[h + 6] = G[(d + (4 * h + 24)) >> 2]),
                  (e[h + 7] = G[(d + (4 * h + 28)) >> 2]),
                  (e[h + 8] = G[(d + (4 * h + 32)) >> 2]);
            else e = G.subarray(d >> 2, (d + 36 * b) >> 2);
            L.uniformMatrix3fv(R[a], !!c, e);
          }
        },
        Yg: function (a, b, c, d) {
          if (2 <= U.version) L.uniformMatrix4fv(R[a], !!c, G, d >> 2, 16 * b);
          else {
            if (256 >= 16 * b) {
              var e = je[16 * b - 1],
                h = G;
              d >>= 2;
              for (var n = 0; n < 16 * b; n += 16) {
                var q = d + n;
                e[n] = h[q];
                e[n + 1] = h[q + 1];
                e[n + 2] = h[q + 2];
                e[n + 3] = h[q + 3];
                e[n + 4] = h[q + 4];
                e[n + 5] = h[q + 5];
                e[n + 6] = h[q + 6];
                e[n + 7] = h[q + 7];
                e[n + 8] = h[q + 8];
                e[n + 9] = h[q + 9];
                e[n + 10] = h[q + 10];
                e[n + 11] = h[q + 11];
                e[n + 12] = h[q + 12];
                e[n + 13] = h[q + 13];
                e[n + 14] = h[q + 14];
                e[n + 15] = h[q + 15];
              }
            } else e = G.subarray(d >> 2, (d + 64 * b) >> 2);
            L.uniformMatrix4fv(R[a], !!c, e);
          }
        },
        Xg: function (a) {
          L.useProgram(N[a]);
        },
        Wg: function (a, b) {
          L.vertexAttrib1f(a, b);
        },
        Vg: function (a, b) {
          L.vertexAttrib2f(a, G[b >> 2], G[(b + 4) >> 2]);
        },
        Ug: function (a, b) {
          L.vertexAttrib3f(a, G[b >> 2], G[(b + 4) >> 2], G[(b + 8) >> 2]);
        },
        Tg: function (a, b) {
          L.vertexAttrib4f(
            a,
            G[b >> 2],
            G[(b + 4) >> 2],
            G[(b + 8) >> 2],
            G[(b + 12) >> 2]
          );
        },
        Sg: function (a, b, c, d, e, h) {
          L.vertexAttribPointer(a, b, c, !!d, e, h);
        },
        Rg: function (a, b, c, d) {
          L.viewport(a, b, c, d);
        },
        j: $e,
        v: af,
        g: bf,
        D: cf,
        Pg: df,
        W: ef,
        V: ff,
        U: gf,
        i: hf,
        k: jf,
        s: kf,
        u: lf,
        Og: mf,
        Mg: nf,
        Ng: of,
        memory: La,
        q: function (a) {
          a = +a;
          return 0 <= a ? +ub(a + 0.5) : +tb(a - 0.5);
        },
        r: De,
        Ud: function () {},
        L: function () {},
        zd: function () {},
        od: function () {},
        b: function (a) {
          Ja = a | 0;
        },
        xg: function (a, b, c, d) {
          return Ne(a, b, c, d);
        },
        table: Ma,
        c: function (a, b, c) {
          a |= 0;
          b |= 0;
          c |= 0;
          for (var d = 0, e; (d | 0) < (c | 0); ) {
            e = v[(b + (d << 3)) >> 2] | 0;
            if (0 == (e | 0)) break;
            if ((e | 0) == (a | 0)) return v[(b + ((d << 3) + 4)) >> 2] | 0;
            d = (d + 1) | 0;
          }
          return 0;
        },
      },
      qf = (function () {
        function a(e) {
          g.asm = e.exports;
          vb--;
          g.monitorRunDependencies && g.monitorRunDependencies(vb);
          0 == vb &&
            (null !== wb && (clearInterval(wb), (wb = null)),
            xb && ((e = xb), (xb = null), e()));
        }
        function b(e) {
          a(e.instance);
        }
        function c(e) {
          return Db()
            .then(function (h) {
              return WebAssembly.instantiate(h, d);
            })
            .then(e, function (h) {
              Ga("failed to asynchronously prepare wasm: " + h);
              Ea(h);
            });
        }
        var d = { a: pf };
        vb++;
        g.monitorRunDependencies && g.monitorRunDependencies(vb);
        if (g.instantiateWasm)
          try {
            return g.instantiateWasm(d, a);
          } catch (e) {
            return (
              Ga("Module.instantiateWasm callback failed with error: " + e), !1
            );
          }
        (function () {
          if (
            Ka ||
            "function" !== typeof WebAssembly.instantiateStreaming ||
            Ab() ||
            yb("file://") ||
            "function" !== typeof fetch
          )
            return c(b);
          fetch(zb, { credentials: "same-origin" }).then(function (e) {
            return WebAssembly.instantiateStreaming(e, d).then(b, function (h) {
              Ga("wasm streaming compile failed: " + h);
              Ga("falling back to ArrayBuffer instantiation");
              c(b);
            });
          });
        })();
        return {};
      })();
    g.asm = qf;
    var Eb = (g.___wasm_call_ctors = function () {
        return (Eb = g.___wasm_call_ctors = g.asm.Dh).apply(null, arguments);
      }),
      Xe = (g._memset = function () {
        return (Xe = g._memset = g.asm.Eh).apply(null, arguments);
      }),
      cb = (g._malloc = function () {
        return (cb = g._malloc = g.asm.Fh).apply(null, arguments);
      }),
      Ic = (g._free = function () {
        return (Ic = g._free = g.asm.Gh).apply(null, arguments);
      }),
      Ee = (g._realloc = function () {
        return (Ee = g._realloc = g.asm.Hh).apply(null, arguments);
      }),
      Ve = (g.___errno_location = function () {
        return (Ve = g.___errno_location = g.asm.Ih).apply(null, arguments);
      }),
      Hc = (g.___getTypeName = function () {
        return (Hc = g.___getTypeName = g.asm.Jh).apply(null, arguments);
      });
    g.___embind_register_native_and_builtin_types = function () {
      return (g.___embind_register_native_and_builtin_types = g.asm.Kh).apply(
        null,
        arguments
      );
    };
    var Ye = (g._emscripten_GetProcAddress = function () {
        return (Ye = g._emscripten_GetProcAddress = g.asm.Lh).apply(
          null,
          arguments
        );
      }),
      Ze = (g._setThrew = function () {
        return (Ze = g._setThrew = g.asm.Mh).apply(null, arguments);
      }),
      We = (g._memalign = function () {
        return (We = g._memalign = g.asm.Nh).apply(null, arguments);
      }),
      rf = (g.dynCall_v = function () {
        return (rf = g.dynCall_v = g.asm.Oh).apply(null, arguments);
      }),
      sf = (g.dynCall_vi = function () {
        return (sf = g.dynCall_vi = g.asm.Ph).apply(null, arguments);
      }),
      tf = (g.dynCall_vii = function () {
        return (tf = g.dynCall_vii = g.asm.Qh).apply(null, arguments);
      }),
      uf = (g.dynCall_viii = function () {
        return (uf = g.dynCall_viii = g.asm.Rh).apply(null, arguments);
      }),
      vf = (g.dynCall_viiii = function () {
        return (vf = g.dynCall_viiii = g.asm.Sh).apply(null, arguments);
      }),
      wf = (g.dynCall_viiiii = function () {
        return (wf = g.dynCall_viiiii = g.asm.Th).apply(null, arguments);
      }),
      xf = (g.dynCall_viiiiii = function () {
        return (xf = g.dynCall_viiiiii = g.asm.Uh).apply(null, arguments);
      }),
      yf = (g.dynCall_viiiiiiiii = function () {
        return (yf = g.dynCall_viiiiiiiii = g.asm.Vh).apply(null, arguments);
      }),
      zf = (g.dynCall_ii = function () {
        return (zf = g.dynCall_ii = g.asm.Wh).apply(null, arguments);
      }),
      Af = (g.dynCall_iii = function () {
        return (Af = g.dynCall_iii = g.asm.Xh).apply(null, arguments);
      }),
      Bf = (g.dynCall_iiii = function () {
        return (Bf = g.dynCall_iiii = g.asm.Yh).apply(null, arguments);
      }),
      Cf = (g.dynCall_iiiii = function () {
        return (Cf = g.dynCall_iiiii = g.asm.Zh).apply(null, arguments);
      }),
      Df = (g.dynCall_iiiiii = function () {
        return (Df = g.dynCall_iiiiii = g.asm._h).apply(null, arguments);
      }),
      Ef = (g.dynCall_iiiiiii = function () {
        return (Ef = g.dynCall_iiiiiii = g.asm.$h).apply(null, arguments);
      }),
      Ff = (g.dynCall_iiiiiiiiii = function () {
        return (Ff = g.dynCall_iiiiiiiiii = g.asm.ai).apply(null, arguments);
      }),
      Gf = (g.stackSave = function () {
        return (Gf = g.stackSave = g.asm.bi).apply(null, arguments);
      }),
      Hf = (g.stackRestore = function () {
        return (Hf = g.stackRestore = g.asm.ci).apply(null, arguments);
      });
    g.dynCall_i = function () {
      return (g.dynCall_i = g.asm.di).apply(null, arguments);
    };
    g.dynCall_vif = function () {
      return (g.dynCall_vif = g.asm.ei).apply(null, arguments);
    };
    g.dynCall_viffi = function () {
      return (g.dynCall_viffi = g.asm.fi).apply(null, arguments);
    };
    g.dynCall_viifi = function () {
      return (g.dynCall_viifi = g.asm.gi).apply(null, arguments);
    };
    g.dynCall_viiiiiiiiii = function () {
      return (g.dynCall_viiiiiiiiii = g.asm.hi).apply(null, arguments);
    };
    g.dynCall_viifiiiiiii = function () {
      return (g.dynCall_viifiiiiiii = g.asm.ii).apply(null, arguments);
    };
    g.dynCall_viffiiiiffiii = function () {
      return (g.dynCall_viffiiiiffiii = g.asm.ji).apply(null, arguments);
    };
    g.dynCall_viififiiiiiii = function () {
      return (g.dynCall_viififiiiiiii = g.asm.ki).apply(null, arguments);
    };
    g.dynCall_viiffii = function () {
      return (g.dynCall_viiffii = g.asm.li).apply(null, arguments);
    };
    g.dynCall_viiiiiiii = function () {
      return (g.dynCall_viiiiiiii = g.asm.mi).apply(null, arguments);
    };
    g.dynCall_vifffi = function () {
      return (g.dynCall_vifffi = g.asm.ni).apply(null, arguments);
    };
    g.dynCall_viiff = function () {
      return (g.dynCall_viiff = g.asm.oi).apply(null, arguments);
    };
    g.dynCall_viiffi = function () {
      return (g.dynCall_viiffi = g.asm.pi).apply(null, arguments);
    };
    g.dynCall_viffffi = function () {
      return (g.dynCall_viffffi = g.asm.qi).apply(null, arguments);
    };
    g.dynCall_viiiifiii = function () {
      return (g.dynCall_viiiifiii = g.asm.ri).apply(null, arguments);
    };
    g.dynCall_viiiffii = function () {
      return (g.dynCall_viiiffii = g.asm.si).apply(null, arguments);
    };
    g.dynCall_vifff = function () {
      return (g.dynCall_vifff = g.asm.ti).apply(null, arguments);
    };
    g.dynCall_viff = function () {
      return (g.dynCall_viff = g.asm.ui).apply(null, arguments);
    };
    g.dynCall_iifii = function () {
      return (g.dynCall_iifii = g.asm.vi).apply(null, arguments);
    };
    g.dynCall_vifii = function () {
      return (g.dynCall_vifii = g.asm.wi).apply(null, arguments);
    };
    g.dynCall_viif = function () {
      return (g.dynCall_viif = g.asm.xi).apply(null, arguments);
    };
    g.dynCall_fi = function () {
      return (g.dynCall_fi = g.asm.yi).apply(null, arguments);
    };
    g.dynCall_fii = function () {
      return (g.dynCall_fii = g.asm.zi).apply(null, arguments);
    };
    g.dynCall_iiffii = function () {
      return (g.dynCall_iiffii = g.asm.Ai).apply(null, arguments);
    };
    g.dynCall_viffii = function () {
      return (g.dynCall_viffii = g.asm.Bi).apply(null, arguments);
    };
    g.dynCall_iiifi = function () {
      return (g.dynCall_iiifi = g.asm.Ci).apply(null, arguments);
    };
    g.dynCall_iif = function () {
      return (g.dynCall_iif = g.asm.Di).apply(null, arguments);
    };
    g.dynCall_iiiif = function () {
      return (g.dynCall_iiiif = g.asm.Ei).apply(null, arguments);
    };
    g.dynCall_viiif = function () {
      return (g.dynCall_viiif = g.asm.Fi).apply(null, arguments);
    };
    g.dynCall_iiffi = function () {
      return (g.dynCall_iiffi = g.asm.Gi).apply(null, arguments);
    };
    g.dynCall_viifffffffffi = function () {
      return (g.dynCall_viifffffffffi = g.asm.Hi).apply(null, arguments);
    };
    g.dynCall_viffffii = function () {
      return (g.dynCall_viffffii = g.asm.Ii).apply(null, arguments);
    };
    g.dynCall_vifffff = function () {
      return (g.dynCall_vifffff = g.asm.Ji).apply(null, arguments);
    };
    g.dynCall_vifffiiff = function () {
      return (g.dynCall_vifffiiff = g.asm.Ki).apply(null, arguments);
    };
    g.dynCall_iiff = function () {
      return (g.dynCall_iiff = g.asm.Li).apply(null, arguments);
    };
    g.dynCall_viffffff = function () {
      return (g.dynCall_viffffff = g.asm.Mi).apply(null, arguments);
    };
    g.dynCall_viffff = function () {
      return (g.dynCall_viffff = g.asm.Ni).apply(null, arguments);
    };
    g.dynCall_vifffffffff = function () {
      return (g.dynCall_vifffffffff = g.asm.Oi).apply(null, arguments);
    };
    g.dynCall_iifff = function () {
      return (g.dynCall_iifff = g.asm.Pi).apply(null, arguments);
    };
    g.dynCall_iiiiiiiiiii = function () {
      return (g.dynCall_iiiiiiiiiii = g.asm.Qi).apply(null, arguments);
    };
    g.dynCall_iiifiiiiiii = function () {
      return (g.dynCall_iiifiiiiiii = g.asm.Ri).apply(null, arguments);
    };
    g.dynCall_iiffiiiiffiii = function () {
      return (g.dynCall_iiffiiiiffiii = g.asm.Si).apply(null, arguments);
    };
    g.dynCall_iiififiiiiiii = function () {
      return (g.dynCall_iiififiiiiiii = g.asm.Ti).apply(null, arguments);
    };
    g.dynCall_viifffi = function () {
      return (g.dynCall_viifffi = g.asm.Ui).apply(null, arguments);
    };
    g.dynCall_viiiff = function () {
      return (g.dynCall_viiiff = g.asm.Vi).apply(null, arguments);
    };
    g.dynCall_viiiffi = function () {
      return (g.dynCall_viiiffi = g.asm.Wi).apply(null, arguments);
    };
    g.dynCall_viiiiiii = function () {
      return (g.dynCall_viiiiiii = g.asm.Xi).apply(null, arguments);
    };
    g.dynCall_viiffffi = function () {
      return (g.dynCall_viiffffi = g.asm.Yi).apply(null, arguments);
    };
    g.dynCall_viiiiifiii = function () {
      return (g.dynCall_viiiiifiii = g.asm.Zi).apply(null, arguments);
    };
    g.dynCall_viiiiffii = function () {
      return (g.dynCall_viiiiffii = g.asm._i).apply(null, arguments);
    };
    g.dynCall_iiiiiiii = function () {
      return (g.dynCall_iiiiiiii = g.asm.$i).apply(null, arguments);
    };
    g.dynCall_viifff = function () {
      return (g.dynCall_viifff = g.asm.aj).apply(null, arguments);
    };
    g.dynCall_iiif = function () {
      return (g.dynCall_iiif = g.asm.bj).apply(null, arguments);
    };
    g.dynCall_iiiffi = function () {
      return (g.dynCall_iiiffi = g.asm.cj).apply(null, arguments);
    };
    g.dynCall_iiifff = function () {
      return (g.dynCall_iiifff = g.asm.dj).apply(null, arguments);
    };
    g.dynCall_fiii = function () {
      return (g.dynCall_fiii = g.asm.ej).apply(null, arguments);
    };
    g.dynCall_viiifffffffffi = function () {
      return (g.dynCall_viiifffffffffi = g.asm.fj).apply(null, arguments);
    };
    g.dynCall_viiffffii = function () {
      return (g.dynCall_viiffffii = g.asm.gj).apply(null, arguments);
    };
    g.dynCall_viifffff = function () {
      return (g.dynCall_viifffff = g.asm.hj).apply(null, arguments);
    };
    g.dynCall_viifffiiff = function () {
      return (g.dynCall_viifffiiff = g.asm.ij).apply(null, arguments);
    };
    g.dynCall_iiiff = function () {
      return (g.dynCall_iiiff = g.asm.jj).apply(null, arguments);
    };
    g.dynCall_viiffffff = function () {
      return (g.dynCall_viiffffff = g.asm.kj).apply(null, arguments);
    };
    g.dynCall_viiffff = function () {
      return (g.dynCall_viiffff = g.asm.lj).apply(null, arguments);
    };
    g.dynCall_viifffffffff = function () {
      return (g.dynCall_viifffffffff = g.asm.mj).apply(null, arguments);
    };
    g.dynCall_fiiiiii = function () {
      return (g.dynCall_fiiiiii = g.asm.nj).apply(null, arguments);
    };
    g.dynCall_viiiiiff = function () {
      return (g.dynCall_viiiiiff = g.asm.oj).apply(null, arguments);
    };
    g.dynCall_viiiiifiiiiii = function () {
      return (g.dynCall_viiiiifiiiiii = g.asm.pj).apply(null, arguments);
    };
    g.dynCall_iiifii = function () {
      return (g.dynCall_iiifii = g.asm.qj).apply(null, arguments);
    };
    g.dynCall_iiiiiiiii = function () {
      return (g.dynCall_iiiiiiiii = g.asm.rj).apply(null, arguments);
    };
    g.dynCall_ji = function () {
      return (g.dynCall_ji = g.asm.sj).apply(null, arguments);
    };
    g.dynCall_iiji = function () {
      return (g.dynCall_iiji = g.asm.tj).apply(null, arguments);
    };
    g.dynCall_iijjiii = function () {
      return (g.dynCall_iijjiii = g.asm.uj).apply(null, arguments);
    };
    g.dynCall_iij = function () {
      return (g.dynCall_iij = g.asm.vj).apply(null, arguments);
    };
    g.dynCall_vijjjii = function () {
      return (g.dynCall_vijjjii = g.asm.wj).apply(null, arguments);
    };
    g.dynCall_viiiiifi = function () {
      return (g.dynCall_viiiiifi = g.asm.xj).apply(null, arguments);
    };
    g.dynCall_viiiiiiifi = function () {
      return (g.dynCall_viiiiiiifi = g.asm.yj).apply(null, arguments);
    };
    g.dynCall_viiiiiiiiifi = function () {
      return (g.dynCall_viiiiiiiiifi = g.asm.zj).apply(null, arguments);
    };
    g.dynCall_viiiiiiiiiifi = function () {
      return (g.dynCall_viiiiiiiiiifi = g.asm.Aj).apply(null, arguments);
    };
    g.dynCall_viifii = function () {
      return (g.dynCall_viifii = g.asm.Bj).apply(null, arguments);
    };
    g.dynCall_viiiiiiiiiiii = function () {
      return (g.dynCall_viiiiiiiiiiii = g.asm.Cj).apply(null, arguments);
    };
    g.dynCall_iidi = function () {
      return (g.dynCall_iidi = g.asm.Dj).apply(null, arguments);
    };
    g.dynCall_viiiiiiiiiiiiiii = function () {
      return (g.dynCall_viiiiiiiiiiiiiii = g.asm.Ej).apply(null, arguments);
    };
    g.dynCall_viji = function () {
      return (g.dynCall_viji = g.asm.Fj).apply(null, arguments);
    };
    g.dynCall_vijiii = function () {
      return (g.dynCall_vijiii = g.asm.Gj).apply(null, arguments);
    };
    g.dynCall_viiiiij = function () {
      return (g.dynCall_viiiiij = g.asm.Hj).apply(null, arguments);
    };
    g.dynCall_fiff = function () {
      return (g.dynCall_fiff = g.asm.Ij).apply(null, arguments);
    };
    g.dynCall_viiiiiffii = function () {
      return (g.dynCall_viiiiiffii = g.asm.Jj).apply(null, arguments);
    };
    g.dynCall_viid = function () {
      return (g.dynCall_viid = g.asm.Kj).apply(null, arguments);
    };
    g.dynCall_viddi = function () {
      return (g.dynCall_viddi = g.asm.Lj).apply(null, arguments);
    };
    g.dynCall_viiiiffi = function () {
      return (g.dynCall_viiiiffi = g.asm.Mj).apply(null, arguments);
    };
    g.dynCall_di = function () {
      return (g.dynCall_di = g.asm.Nj).apply(null, arguments);
    };
    g.dynCall_viijii = function () {
      return (g.dynCall_viijii = g.asm.Oj).apply(null, arguments);
    };
    g.dynCall_jii = function () {
      return (g.dynCall_jii = g.asm.Pj).apply(null, arguments);
    };
    g.dynCall_vijii = function () {
      return (g.dynCall_vijii = g.asm.Qj).apply(null, arguments);
    };
    g.dynCall_viifd = function () {
      return (g.dynCall_viifd = g.asm.Rj).apply(null, arguments);
    };
    g.dynCall_viiiiff = function () {
      return (g.dynCall_viiiiff = g.asm.Sj).apply(null, arguments);
    };
    g.dynCall_vffff = function () {
      return (g.dynCall_vffff = g.asm.Tj).apply(null, arguments);
    };
    g.dynCall_vf = function () {
      return (g.dynCall_vf = g.asm.Uj).apply(null, arguments);
    };
    g.dynCall_viiiiiiiiiii = function () {
      return (g.dynCall_viiiiiiiiiii = g.asm.Vj).apply(null, arguments);
    };
    g.dynCall_iiiij = function () {
      return (g.dynCall_iiiij = g.asm.Wj).apply(null, arguments);
    };
    g.dynCall_viiij = function () {
      return (g.dynCall_viiij = g.asm.Xj).apply(null, arguments);
    };
    g.dynCall_vij = function () {
      return (g.dynCall_vij = g.asm.Yj).apply(null, arguments);
    };
    g.dynCall_iiiiiiiiiiii = function () {
      return (g.dynCall_iiiiiiiiiiii = g.asm.Zj).apply(null, arguments);
    };
    g.dynCall_jiiii = function () {
      return (g.dynCall_jiiii = g.asm._j).apply(null, arguments);
    };
    g.dynCall_jiii = function () {
      return (g.dynCall_jiii = g.asm.$j).apply(null, arguments);
    };
    g.dynCall_iidiiii = function () {
      return (g.dynCall_iidiiii = g.asm.ak).apply(null, arguments);
    };
    g.dynCall_jiji = function () {
      return (g.dynCall_jiji = g.asm.bk).apply(null, arguments);
    };
    g.dynCall_iiiiij = function () {
      return (g.dynCall_iiiiij = g.asm.ck).apply(null, arguments);
    };
    g.dynCall_iiiiid = function () {
      return (g.dynCall_iiiiid = g.asm.dk).apply(null, arguments);
    };
    g.dynCall_iiiiijj = function () {
      return (g.dynCall_iiiiijj = g.asm.ek).apply(null, arguments);
    };
    g.dynCall_iiiiiijj = function () {
      return (g.dynCall_iiiiiijj = g.asm.fk).apply(null, arguments);
    };
    g.dynCall_vff = function () {
      return (g.dynCall_vff = g.asm.gk).apply(null, arguments);
    };
    g.dynCall_vfi = function () {
      return (g.dynCall_vfi = g.asm.hk).apply(null, arguments);
    };
    function $e(a, b) {
      var c = Gf();
      try {
        return zf(a, b);
      } catch (d) {
        Hf(c);
        if (d !== d + 0 && "longjmp" !== d) throw d;
        Ze(1, 0);
      }
    }
    function af(a, b, c) {
      var d = Gf();
      try {
        return Af(a, b, c);
      } catch (e) {
        Hf(d);
        if (e !== e + 0 && "longjmp" !== e) throw e;
        Ze(1, 0);
      }
    }
    function jf(a, b, c) {
      var d = Gf();
      try {
        tf(a, b, c);
      } catch (e) {
        Hf(d);
        if (e !== e + 0 && "longjmp" !== e) throw e;
        Ze(1, 0);
      }
    }
    function bf(a, b, c, d) {
      var e = Gf();
      try {
        return Bf(a, b, c, d);
      } catch (h) {
        Hf(e);
        if (h !== h + 0 && "longjmp" !== h) throw h;
        Ze(1, 0);
      }
    }
    function hf(a, b) {
      var c = Gf();
      try {
        sf(a, b);
      } catch (d) {
        Hf(c);
        if (d !== d + 0 && "longjmp" !== d) throw d;
        Ze(1, 0);
      }
    }
    function kf(a, b, c, d) {
      var e = Gf();
      try {
        uf(a, b, c, d);
      } catch (h) {
        Hf(e);
        if (h !== h + 0 && "longjmp" !== h) throw h;
        Ze(1, 0);
      }
    }
    function df(a, b, c, d, e, h) {
      var n = Gf();
      try {
        return Df(a, b, c, d, e, h);
      } catch (q) {
        Hf(n);
        if (q !== q + 0 && "longjmp" !== q) throw q;
        Ze(1, 0);
      }
    }
    function lf(a, b, c, d, e) {
      var h = Gf();
      try {
        vf(a, b, c, d, e);
      } catch (n) {
        Hf(h);
        if (n !== n + 0 && "longjmp" !== n) throw n;
        Ze(1, 0);
      }
    }
    function ef(a, b, c, d, e, h, n) {
      var q = Gf();
      try {
        return Ef(a, b, c, d, e, h, n);
      } catch (u) {
        Hf(q);
        if (u !== u + 0 && "longjmp" !== u) throw u;
        Ze(1, 0);
      }
    }
    function mf(a, b, c, d, e, h) {
      var n = Gf();
      try {
        wf(a, b, c, d, e, h);
      } catch (q) {
        Hf(n);
        if (q !== q + 0 && "longjmp" !== q) throw q;
        Ze(1, 0);
      }
    }
    function cf(a, b, c, d, e) {
      var h = Gf();
      try {
        return Cf(a, b, c, d, e);
      } catch (n) {
        Hf(h);
        if (n !== n + 0 && "longjmp" !== n) throw n;
        Ze(1, 0);
      }
    }
    function of(a, b, c, d, e, h, n, q, u, A) {
      var C = Gf();
      try {
        yf(a, b, c, d, e, h, n, q, u, A);
      } catch (M) {
        Hf(C);
        if (M !== M + 0 && "longjmp" !== M) throw M;
        Ze(1, 0);
      }
    }
    function nf(a, b, c, d, e, h, n) {
      var q = Gf();
      try {
        xf(a, b, c, d, e, h, n);
      } catch (u) {
        Hf(q);
        if (u !== u + 0 && "longjmp" !== u) throw u;
        Ze(1, 0);
      }
    }
    function ff(a, b, c, d, e, h, n, q, u, A) {
      var C = Gf();
      try {
        return Ff(a, b, c, d, e, h, n, q, u, A);
      } catch (M) {
        Hf(C);
        if (M !== M + 0 && "longjmp" !== M) throw M;
        Ze(1, 0);
      }
    }
    function gf(a) {
      var b = Gf();
      try {
        rf(a);
      } catch (c) {
        Hf(b);
        if (c !== c + 0 && "longjmp" !== c) throw c;
        Ze(1, 0);
      }
    }
    g.asm = qf;
    var If;
    function Da(a) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + a + ")";
      this.status = a;
    }
    xb = function Jf() {
      If || Kf();
      If || (xb = Jf);
    };
    function Kf() {
      function a() {
        if (!If && ((If = !0), (g.calledRun = !0), !Na)) {
          nb(pb);
          nb(qb);
          aa(g);
          if (g.onRuntimeInitialized) g.onRuntimeInitialized();
          if (g.postRun)
            for (
              "function" == typeof g.postRun && (g.postRun = [g.postRun]);
              g.postRun.length;

            ) {
              var b = g.postRun.shift();
              rb.unshift(b);
            }
          nb(rb);
        }
      }
      if (!(0 < vb)) {
        if (g.preRun)
          for (
            "function" == typeof g.preRun && (g.preRun = [g.preRun]);
            g.preRun.length;

          )
            sb();
        nb(ob);
        0 < vb ||
          (g.setStatus
            ? (g.setStatus("Running..."),
              setTimeout(function () {
                setTimeout(function () {
                  g.setStatus("");
                }, 1);
                a();
              }, 1))
            : a());
      }
    }
    g.run = Kf;
    if (g.preInit)
      for (
        "function" == typeof g.preInit && (g.preInit = [g.preInit]);
        0 < g.preInit.length;

      )
        g.preInit.pop()();
    noExitRuntime = !0;
    Kf();

    return CanvasKitInit.ready;
  };
})();
if (typeof exports === "object" && typeof module === "object")
  module.exports = CanvasKitInit;
else if (typeof define === "function" && define["amd"])
  define([], function () {
    return CanvasKitInit;
  });
else if (typeof exports === "object") exports["CanvasKitInit"] = CanvasKitInit;
