import path from 'path';
import fs from 'fs'

interface DependencyType {
    dependencies: string[]
    name: string
    files: string[]
}

export const install_component = (name: string) => {
    const targetDirectory = getTargetDirectory()
    const componentsMeta: DependencyType[] = JSON.parse(fs.readFileSync(`${__dirname}/components.json`).toString())

    const componentMeta = componentsMeta.find(c => c.name === name)
    if (!componentMeta) {
        console.error(`Component ${name} not found.`)
        process.exit(1)
    }

    for(let dep of componentMeta["dependencies"]) {
        if(!checkComponentDependency(dep)){
            console.error(`[-] Dependency ${dep} not found.`)
            process.exit(1)
        }
    }

    for(let file of componentMeta["files"]) {
        const source = `${__dirname}/${file}`
        const dest = `${targetDirectory}/${file}`
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.copyFileSync(source, dest)
    }

    console.log(`Component ${name} has been installed`)
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

const checkComponentDependency = (component: string) => {
    const shadcnDirectory = getShadcnDirectory()
    if(shadcnDirectory){
        const files = fs.readdirSync(shadcnDirectory);
        if(files.includes(component)){
            return true;
        }
    }
    return false
}