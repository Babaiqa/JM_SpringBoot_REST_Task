package MyCRUDApp.jm_springboot_task.dao;

import MyCRUDApp.jm_springboot_task.model.Role;
import MyCRUDApp.jm_springboot_task.model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository("roleDAO")
public class RoleDAOImpl implements RoleDAO {

    private EntityManager entityManager;

    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Role getRoleById(int id) {
            return entityManager.find(Role.class, id);
    }

    @Override
    public List<Role> getAllRoles() {
        return entityManager.createQuery("from Role").getResultList();
    }


    @Override
    public Role getRoleByName(String roleName) {
        return (Role) entityManager.createQuery("from Role where roleName= :name")
                .setParameter("name", roleName)
                .getSingleResult();
    }

    @Override
    public void deleteRole(int id) {
        entityManager.remove(entityManager.find(Role.class, id));
    }

    @Override
    public Role saveRole(Role role) {
        entityManager.persist(role);

        return role;
    }

    @Override
    public Role updateRole(Role role) {
        entityManager.merge(role);
        return role;
    }
}
