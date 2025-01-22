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



export const install_component = (name: string) => {
    const targetDirectory = getTargetDirectory()
    const componentsMeta: ComponentsFileStructure = JSON.parse(fs.readFileSync(`${__dirname}/components.json`).toString())

    const componentMeta = componentsMeta.registry.find(c => c.name === name)
    if (!componentMeta) {
        console.error(`Component ${name} not found.`)
        process.exit(1)
    }

    if(componentMeta.dependencies){
        for(let dep of componentMeta.dependencies) {
            console.log(`[*] ${name} requires ${dep}. Trying to install..`)
            install_component(dep)
        }
    }

    if(componentMeta.requirements){
        for(let dep of componentMeta.requirements) {
            console.log(`[*] ${name} requires ${dep} of shadcn. Checking installation...`)
            if(!checkComponentDependency(dep, componentsMeta.requirements)){
                console.error(`[-] Dependency ${dep} not found.`)
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

    console.log(`[+] Component ${name} has been installed`)
}

const getTargetDirectory = () => {
    const target_project_directory = process.cwd();
    const target_directory = path.join(target_project_directory, "components", "shadcn-ex");

    if(!fs.existsSync(target_directory)) {
        fs.mkdirSync(target_directory);
    }

    return target_directory;
}

const getShadcnDirectory = (): string => {
    const target_project_directory = process.cwd();
    return path.join(target_project_directory, "components", "ui");
}

const checkComponentDependency = (component: string, requirements: RequirementType[]) => {
    let requirement = requirements.find(c => c.name === component);
    if(!requirement){
        console.error(`Requirement ${requirement} not found.`)
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