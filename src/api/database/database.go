package antify

import "os"
import "path/filepath"
import uuid "github.com/brtmvdl/antify/uuid"

const SLASH = "/"
const DIR_PERMISSION = 0755
const FILE_PERMISSION = 0644

type Database struct {
	DataPath string
}

func (db Database) In(path string) Database {
	return Database{filepath.Join(db.DataPath, path)}
}

func (db Database) New() (DatabaseObject, error) {
	obj := DatabaseObject{
		Database: db,
		Id: uuid.New(),
	}

	err := obj.CreatePath()

	if (err != nil) {
		return DatabaseObject{}, err
	}

	return obj, nil
}

func (db Database) ToString() string {
	return "Database"
}

type DatabaseObject struct {
	Database
	Id string
}

func (obj DatabaseObject) GetPath() string {
	return filepath.Join(obj.Database.DataPath, obj.Id)
}

func (obj DatabaseObject) CreatePath() error {
	return os.MkdirAll(obj.GetPath(), DIR_PERMISSION)
}

func (obj DatabaseObject) WriteMany(props map[string][]byte) []error {
	errors := make([]error, 0)

	for key, value := range props {
		err := obj.Write(key, value)

		if err != nil {
			errors = append(errors, err)
		}
	}

	return errors
}

func (obj DatabaseObject) GetPropPath(name string) string {
	return filepath.Join(obj.GetPath(), name)
}

func (obj DatabaseObject) Write(name string, value []byte) error {
	return os.WriteFile(obj.GetPropPath(name), value, FILE_PERMISSION)
}

func (obj DatabaseObject) ToString() string {
	return "DatabaseObject"
}
