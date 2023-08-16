// Concrete Products: GreenTea, BlackTea, HerbalTea
class GreenTea {
    brew() {
        return "Brewing green tea...";
    }
    package() {
        return "Packaging green tea...";
    }
}
class BlackTea {
    brew() {
        return "Brewing black tea...";
    }
    package() {
        return "Packaging black tea...";
    }
}
class HerbalTea {
    brew() {
        return "Brewing herbal tea...";
    }
    package() {
        return "Packaging herbal tea...";
    }
}
// Creator: TeaFactory
class TeaFactory {
}
// Concrete Creators: GreenTeaFactory, BlackTeaFactory, HerbalTeaFactory
class GreenTeaFactory extends TeaFactory {
    createTea() {
        return new GreenTea();
    }
}
class BlackTeaFactory extends TeaFactory {
    createTea() {
        return new BlackTea();
    }
}
class HerbalTeaFactory extends TeaFactory {
    createTea() {
        return new HerbalTea();
    }
}
// Client code
function serveTea(factory) {
    const tea = factory.createTea();
    console.log(tea.brew());
    console.log(tea.package());
}
// Usage
const greenTeaFactory = new GreenTeaFactory();
serveTea(greenTeaFactory);
const blackTeaFactory = new BlackTeaFactory();
serveTea(blackTeaFactory);
const herbalTeaFactory = new HerbalTeaFactory();
serveTea(herbalTeaFactory);
export {};
//# sourceMappingURL=tea_factory_method.js.map