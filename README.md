## General Guidelines for the codebase

### File and Folder Structure

The project follows conventional and standard NextJS file and folder structure using the src directory and App Router. <br />
All design and development files and folders are to be put or colocated inside the /src folder. <br />
The src folder contains 4 sub-folders, desccibed below:

- /app => contains ONLY routing files and is used for routing purposes. No components are to be placed here.
- /components => contains ALL components to be used throughout the project. No routing files or config files here
- /hooks => contains all hooks used throughout the project.
- /lib => contains all miscallenous files and folders. Type files, constants, configs, server actions, everything else not stated above goes here.

#### Remember to arrange the content in an orderly and easy-to-reference format.

### Naming Conventions

- Folders in /app: All routing-specifc folders are to be named using folder-name notation. eg, contact-us, our-services, thank-you-page etc.
- Other Folders: All non-routing folders are to be named using camelCase notation. eg, serverActions, randomComponentsForFood, etc.
- Custom Component Files: All custom components and component files are to be named using PascalCase notation. eg, Testimonials, SiteFooter, etc.
- Non-component files: All non-component files are to be named using snake_case notation. eg, library_config_file, custom_types, etc.
