let Optional/map = https://prelude.dhall-lang.org/v20.2.0/Optional/map

let tsconfig =
      https://raw.githubusercontent.com/maxdeviant/tsconfig/master/dhall-tsconfig.dhall

let baseTsConfig =
      https://raw.githubusercontent.com/maxdeviant/tsconfig/master/tsconfig.dhall

let updateCompilerOptions
    : tsconfig.CompilerOptions.Type -> tsconfig.CompilerOptions.Type
    = \(compilerOptions : tsconfig.CompilerOptions.Type) ->
            compilerOptions
        //  { declaration = Some True
            , esModuleInterop = Some True
            , module = Some tsconfig.ModuleOption.CommonJS
            , moduleResolution = Some "node"
            , target = Some tsconfig.TargetOption.ES5
            }

in      baseTsConfig
    //  { compilerOptions =
            Optional/map
              tsconfig.CompilerOptions.Type
              tsconfig.CompilerOptions.Type
              updateCompilerOptions
              baseTsConfig.compilerOptions
        , include = Some [ "src" ]
        }
