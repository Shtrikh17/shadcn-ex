import path from 'path';
import fs from 'fs'

interface DependencyType {
    requirements?: string[]
    dependencies?: string[]
    name: string
    files: string[]
}

interface RequirementType{
    name: string
    file: string
}

interface ComponentsFileStructure{
    registry: DependencyType[]
    requirements: RequirementType[]
}



export const install_component = (name: string, offset=0) => {
    const targetDirectory = getTargetDirectory()
    const componentsMeta: ComponentsFileStructure = JSON.parse(fs.readFileSync(`${__dirname}/components.json`).toString())

    const componentMeta = componentsMeta.registry.find(c => c.name === name)
    if (!componentMeta) {
        console.error(`${' '.repeat(offset*2)}[-] Component ${name} not found.`)
        process.exit(1)
    }

    if(componentMeta.dependencies){
        for(let dep of componentMeta.dependencies) {
            console.log(`${' '.repeat(offset*2)}[*] ${name} requires ${dep}. Trying to install..`)
            install_component(dep, offset+1)
        }
    }

    if(componentMeta.requirements){

        for(let dep of componentMeta.requirements) {
            console.log(`${' '.repeat(offset*2)}[*] ${name} requires ${dep} of shadcn. Checking installation...`)
            if(!checkComponentDependency(dep, componentsMeta.requirements, offset)){
                console.error(`${' '.repeat(offset*2)}[-] Dependency ${dep} not found.`)
                process.exit(1)
            }
        }
    }

    for(let file of componentMeta["files"]) {
        const source = `${__dirname}/${file}`
        const dest = `${targetDirectory}/${file}`
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.copyFileSync(source, dest)
    }

    console.log(`${' '.repeat(offset*2)}[+] Component ${name} has been installed`)
}

const getTargetDirectory = () => {
    let componentsPath = getComponentsPath()
    if(!componentsPath) return null
    const target_directory = path.join(componentsPath, "components", "shadcn-ex");

    if(!fs.existsSync(target_directory)) {
        fs.mkdirSync(target_directory);
    }

    return target_directory;
}

const getShadcnDirectory = (): string | null => {
    let componentsPath = getComponentsPath()
    if(!componentsPath) return null
    return path.join(componentsPath, "components", "ui");
}

const checkComponentDependency = (component: string, requirements: RequirementType[], offset=0) => {
    let requirement = requirements.find(c => c.name === component);
    if(!requirement){
        console.error(`${' '.repeat(offset*2)}Requirement ${requirement} not found.`)
        process.exit(1)
    }
    const shadcnDirectory = getShadcnDirectory()
    if(shadcnDirectory){
        const files = fs.readdirSync(shadcnDirectory);
        if(files.includes(requirement.file)){
            return true;
        }
    }
    return false
}

const getComponentsPath = (): string | null => {
    const target_project_directory = process.cwd();
    let tsConfigContents = fs.readFileSync(`${target_project_directory}/tsconfig.json`).toString();
    let tsConfig = JSON.parse(tsConfigContents);
    let paths = tsConfig.compilerOptions.paths["@/*"];
    if(!paths?.length){
        return null
    }
    let componentsPath = paths[0]
    if(componentsPath.endsWith('*')){
        componentsPath = componentsPath.slice(0, -1)
    }
    return path.join(target_project_directory, componentsPath)
}

