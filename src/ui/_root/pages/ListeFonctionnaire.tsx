import { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, ArrowUp, ArrowDown, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"

// Données de test (à remplacer par des vraies données plus tard)
const employees = [
  {
    id: 1,
    matricule: "3XXXXX",
    name: "AYOUB SOLHI",
    grade: "Technicien 3ème grade",
    service: "Service d'audit et contrôle",
    division: "Division des ressources humaines",
  },
  {
    id: 2,
    matricule: "4XXXXX",
    name: "AHMED ALAMI",
    grade: "Administrateur",
    service: "Service informatique",
    division: "Division technique",
  },
  // Ajoutez plus d'employés ici
]

const ListeFonctionnaires = () => {
  const [search, setSearch] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [sortBy, setSortBy] = useState<"name" | "grade" | "service" | "division">("name")
  const { toast } = useToast()

  // Filtrer les employés
  const filteredEmployees = employees.filter((employee) => {
    const searchLower = search.toLowerCase()
    if (searchLower === "") return true

    switch (filterBy) {
      case "name":
        return employee.name.toLowerCase().includes(searchLower)
      case "grade":
        return employee.grade.toLowerCase().includes(searchLower)
      case "service":
        return employee.service.toLowerCase().includes(searchLower)
      case "division":
        return employee.division.toLowerCase().includes(searchLower)
      default:
        return (
          employee.name.toLowerCase().includes(searchLower) ||
          employee.grade.toLowerCase().includes(searchLower) ||
          employee.service.toLowerCase().includes(searchLower) ||
          employee.division.toLowerCase().includes(searchLower)
        )
    }
  })

  // Trier les employés
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const compareResult = a[sortBy].localeCompare(b[sortBy])
    return sortOrder === "asc" ? compareResult : -compareResult
  })

  const handleAddEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newEmployee = {
      matricule: formData.get("matricule") as string,
      name: formData.get("name") as string,
      grade: formData.get("grade") as string,
      service: formData.get("service") as string,
      division: formData.get("division") as string,
    }

    // Ici, vous ajouteriez normalement l'employé à votre base de données
    toast({
      title: "Fonctionnaire ajouté",
      description: `${newEmployee.name} a été ajouté avec succès.`,
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Liste des Fonctionnaires</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un fonctionnaire
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau fonctionnaire</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="matricule">Matricule</Label>
                <Input id="matricule" name="matricule" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Input id="grade" name="grade" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Input id="service" name="service" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="division">Division</Label>
                <Input id="division" name="division" required />
              </div>
              <Button type="submit">Ajouter</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tout</SelectItem>
            <SelectItem value="name">Nom</SelectItem>
            <SelectItem value="grade">Grade</SelectItem>
            <SelectItem value="service">Service</SelectItem>
            <SelectItem value="division">Division</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Matricule</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => {
                    if (sortBy === "name") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    } else {
                      setSortBy("name")
                      setSortOrder("asc")
                    }
                  }}
                >
                  Nom
                  {sortBy === "name" && (
                    sortOrder === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => {
                    if (sortBy === "grade") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    } else {
                      setSortBy("grade")
                      setSortOrder("asc")
                    }
                  }}
                >
                  Grade
                  {sortBy === "grade" && (
                    sortOrder === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => {
                    if (sortBy === "service") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    } else {
                      setSortBy("service")
                      setSortOrder("asc")
                    }
                  }}
                >
                  Service
                  {sortBy === "service" && (
                    sortOrder === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => {
                    if (sortBy === "division") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    } else {
                      setSortBy("division")
                      setSortOrder("asc")
                    }
                  }}
                >
                  Division
                  {sortBy === "division" && (
                    sortOrder === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.matricule}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.grade}</TableCell>
                <TableCell>{employee.service}</TableCell>
                <TableCell>{employee.division}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ListeFonctionnaires